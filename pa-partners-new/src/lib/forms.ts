export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function submitContactToNetlify(payload: ContactPayload) {
  const formData = new FormData();
  formData.append("form-name", "contact");
  Object.entries(payload).forEach(([k, v]) => formData.append(k, v));
  const res = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
  });
  if (!res.ok) throw new Error("Form submission failed");
}

