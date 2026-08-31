import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DirectContactForm from "../DirectContactForm";
import { LanguageProvider } from "@/shared/i18n/LanguageContext";

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe("DirectContactForm Component", () => {
  it("renders input fields and submit buttons correctly with active locale", () => {
    renderWithProvider(<DirectContactForm />);

    expect(screen.getByPlaceholderText(/(Sarah Connor)/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/(Projeto|Project)/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /(Open Email Client|Abrir no Cliente de E-mail)/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /(Copy Message|Copiar Mensagem)/i })).toBeInTheDocument();
  });

  it("updates mailto link href dynamically as user types name, subject and message", () => {
    renderWithProvider(<DirectContactForm />);

    const nameInput = screen.getByPlaceholderText(/(Sarah Connor)/i);
    const subjectInput = screen.getByPlaceholderText(/(Projeto|Project)/i);
    const mailtoButton = screen.getByRole("link", { name: /(Open Email Client|Abrir no Cliente de E-mail)/i });

    fireEvent.change(nameInput, { target: { value: "Alex Developer" } });
    fireEvent.change(subjectInput, { target: { value: "Project Opportunity" } });

    expect(mailtoButton).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:vanderleividor1@gmail.com")
    );
    expect(mailtoButton).toHaveAttribute(
      "href",
      expect.stringContaining("Project%20Opportunity")
    );
  });

  it("triggers clipboard write when Copy Message button is clicked", async () => {
    const writeTextSpy = vi.spyOn(navigator.clipboard, "writeText");

    renderWithProvider(<DirectContactForm />);

    const copyButton = screen.getByRole("button", { name: /(Copy Message|Copiar Mensagem)/i });
    fireEvent.click(copyButton);

    expect(writeTextSpy).toHaveBeenCalled();
  });
});
