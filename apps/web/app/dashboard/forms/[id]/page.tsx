"use client";

import { trpc } from "~/trpc/client";

interface FormEditorPageProps {
  params: {
    id: string;
  };
}

export default function FormEditorPage({
  params,
}: FormEditorPageProps) {
  const { data: form, isLoading } =
    trpc.forms.getById.useQuery({
      id: params.id,
    });

  if (isLoading) {
    return (
      <main className="p-8">
        Loading...
      </main>
    );
  }

  if (!form) {
    return (
      <main className="p-8">
        Form not found
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">
              Form Editor
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              {form.title}
            </h1>

            <p className="mt-3 text-zinc-500">
              {form.description}
            </p>
          </div>

          <button className="rounded-xl bg-black px-5 py-3 text-white">
            Add Field
          </button>
        </div>

        <div className="mt-10 rounded-2xl border p-10">
          <p>No fields added yet.</p>
        </div>
      </div>
    </main>
  );
}