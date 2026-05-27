import { TRPCError } from "@trpc/server";

import { z, zodUndefinedModel } from "../../schema";

import { userService } from "../../services";

import { getAuthenticationMethodOutputSchema } from "@repo/services/user/model";

import { publicProcedure, router } from "../../trpc";

import { generatePath } from "../../utils/path-generator";

import { logout } from '@repo/services/src/auth/logout';
import { getMe } from '@repo/services/src/auth/me';
import { demoLogin } from '@repo/services/src/auth/demo-login';
import { signJwt } from '@repo/services/src/auth/jwt';

import { protectedProcedure } from '../../trpc';

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");


export const authRouter = router({
  me: publicProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.user) return null;
      return await getMe(ctx.user.id);
    } catch (error) {
      console.error('ME AUTH ERROR:', error);
      return null;
    }
  }),

  demoLogin: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }: any) => {
      try {
        const result = await demoLogin(input.email, input.name);
        
        // Generate JWT Access & Refresh Tokens
        const accessToken = signJwt({ userId: result.user.id, email: result.user.email }, 3600); // 1 hour
        const refreshToken = signJwt({ userId: result.user.id, type: 'refresh' }, 30 * 24 * 3600); // 30 days

        ctx.res.cookie('session_token', result.session.sessionToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 1000 * 60 * 60 * 24 * 30,
          path: '/',
        });

        ctx.res.cookie('access_token', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 1000 * 60 * 60, // 1 hour
          path: '/',
        });

        ctx.res.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
          path: '/',
        });

        return {
          success: true,
          user: result.user,
        };
      } catch (error) {
        console.error('DEMO LOGIN ERROR:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error ? error.message : 'Demo login failed',
        });
      }
    }),

  getSupportedAuthenticationProviders: publicProcedure
    .input(zodUndefinedModel)
    .output(z.readonly(z.array(getAuthenticationMethodOutputSchema)))
    .query(async () => {
      const supportedMethods = await userService.getAuthenticationMethods();

      return supportedMethods;
    }),

  googleCallback: publicProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .mutation(async ({ input, ctx }: any) => {
      try {
        const result = await userService.authenticateWithGoogle(input.code);

        if (!result.session) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Session creation failed',
          });
        }

        const accessToken = signJwt({ userId: result.user.id, email: result.user.email }, 3600);
        const refreshToken = signJwt({ userId: result.user.id, type: 'refresh' }, 30 * 24 * 3600);

        ctx.res.cookie('session_token', result.session.sessionToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 1000 * 60 * 60 * 24 * 30,
          path: '/',
        });

        ctx.res.cookie('access_token', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 1000 * 60 * 60,
          path: '/',
        });

        ctx.res.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 1000 * 60 * 60 * 24 * 30,
          path: '/',
        });

        return {
          success: true,
          user: result.user,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Google authentication failed',
        });
      }
    }),

  logout: protectedProcedure.mutation(async ({ ctx }) => {
    const sessionToken = ctx.session?.sessionToken;

    if (!sessionToken) {
      throw new Error('No session found');
    }

    ctx.res.clearCookie('session_token', { path: '/' });
    ctx.res.clearCookie('access_token', { path: '/' });
    ctx.res.clearCookie('refresh_token', { path: '/' });

    return logout(sessionToken);
  }),
});
