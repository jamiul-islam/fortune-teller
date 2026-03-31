import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HeroSection from "./HeroSection";
import FinalCTASection from "./FinalCTASection";
import { NextIntlClientProvider } from "next-intl";

// Mock environment variables
const mockEnv = {
  NEXT_PUBLIC_CALENDLY_URL_15: "https://calendly.com/test/15min",
  NEXT_PUBLIC_CALENDLY_URL_30: "https://calendly.com/test/30min",
  NEXT_PUBLIC_CALENDLY_URL_45: "https://calendly.com/test/60min",
};

Object.assign(process.env, mockEnv);

const messages = {
  hero: {
    title: "Your future is trying to speak to you",
    subtitle: "Clarity. Guidance. Immediate answers",
    cta: "Book a Reading",
    selectDuration: "Select consultation duration",
    duration15: "$15 - 15 minutes",
    duration30: "$25 - 30 minutes",
    duration60: "$45 - 60 minutes",
  },
  finalCta: {
    title: "Ready to discover your path?",
    subtitle: "Book your consultation now and receive immediate guidance",
    cta: "Book a Reading",
    selectDuration: "Select consultation duration",
    duration15: "$15 - 15 minutes",
    duration30: "$25 - 30 minutes",
    duration60: "$45 - 60 minutes",
  },
};

describe("Booking Selector", () => {
  describe("HeroSection", () => {
    it("renders the select dropdown with three options", () => {
      const mockOnCtaClick = vi.fn();
      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <HeroSection
            videoUrl="https://youtube.com/test"
            onCtaClick={mockOnCtaClick}
          />
        </NextIntlClientProvider>,
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeDefined();

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
      expect(options[0].textContent).toBe("$15 - 15 minutes");
      expect(options[1].textContent).toBe("$25 - 30 minutes");
      expect(options[2].textContent).toBe("$45 - 60 minutes");
    });

    it("calls onCtaClick with 15-minute URL by default", () => {
      const mockOnCtaClick = vi.fn();
      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <HeroSection
            videoUrl="https://youtube.com/test"
            onCtaClick={mockOnCtaClick}
          />
        </NextIntlClientProvider>,
      );

      const button = screen.getByRole("button", { name: /book a reading/i });
      fireEvent.click(button);

      expect(mockOnCtaClick).toHaveBeenCalledWith(
        mockEnv.NEXT_PUBLIC_CALENDLY_URL_15,
      );
    });

    it("calls onCtaClick with 30-minute URL when selected", () => {
      const mockOnCtaClick = vi.fn();
      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <HeroSection
            videoUrl="https://youtube.com/test"
            onCtaClick={mockOnCtaClick}
          />
        </NextIntlClientProvider>,
      );

      const select = screen.getByRole("combobox");
      fireEvent.change(select, { target: { value: "30" } });

      const button = screen.getByRole("button", { name: /book a reading/i });
      fireEvent.click(button);

      expect(mockOnCtaClick).toHaveBeenCalledWith(
        mockEnv.NEXT_PUBLIC_CALENDLY_URL_30,
      );
    });

    it("calls onCtaClick with 60-minute URL when selected", () => {
      const mockOnCtaClick = vi.fn();
      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <HeroSection
            videoUrl="https://youtube.com/test"
            onCtaClick={mockOnCtaClick}
          />
        </NextIntlClientProvider>,
      );

      const select = screen.getByRole("combobox");
      fireEvent.change(select, { target: { value: "60" } });

      const button = screen.getByRole("button", { name: /book a reading/i });
      fireEvent.click(button);

      expect(mockOnCtaClick).toHaveBeenCalledWith(
        mockEnv.NEXT_PUBLIC_CALENDLY_URL_45,
      );
    });
  });

  describe("FinalCTASection", () => {
    it("renders the select dropdown with three options", () => {
      const mockOnCtaClick = vi.fn();
      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <FinalCTASection onCtaClick={mockOnCtaClick} />
        </NextIntlClientProvider>,
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeDefined();

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
    });

    it("calls onCtaClick with selected URL", () => {
      const mockOnCtaClick = vi.fn();
      render(
        <NextIntlClientProvider locale="en" messages={messages}>
          <FinalCTASection onCtaClick={mockOnCtaClick} />
        </NextIntlClientProvider>,
      );

      const select = screen.getByRole("combobox");
      fireEvent.change(select, { target: { value: "30" } });

      const button = screen.getByRole("button", { name: /book a reading/i });
      fireEvent.click(button);

      expect(mockOnCtaClick).toHaveBeenCalledWith(
        mockEnv.NEXT_PUBLIC_CALENDLY_URL_30,
      );
    });
  });
});
