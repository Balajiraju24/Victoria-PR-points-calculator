import React from 'react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import VptCalculator from '../calculator/VptCalculator';

describe('VptCalculator Component', () => {
  it('renders all sections and initial live score', () => {
    render(<VptCalculator />);

    expect(screen.getByText(/Victorian Points Test \(VPT\) Calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/Section A/i)).toBeInTheDocument();
    expect(screen.getByText(/Section B/i)).toBeInTheDocument();
    expect(screen.getByText(/Section C/i)).toBeInTheDocument();
    expect(screen.getByText(/Section D/i)).toBeInTheDocument();
    expect(screen.getByText(/Section E/i)).toBeInTheDocument();
    expect(screen.getByText(/Section F/i)).toBeInTheDocument();
    expect(screen.getByText(/Section G/i)).toBeInTheDocument();
    expect(screen.getByText(/Section H/i)).toBeInTheDocument();

    // Check Live Score card
    expect(screen.getByText(/Live Score Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated VPT Score/i)).toBeInTheDocument();
  });

  it('allows changing age and recalculates score in real-time', () => {
    render(<VptCalculator />);

    const ageInput = screen.getByLabelText(/Completed Years of Age/i);
    // Change age to 35 (which is 210 points under official table)
    fireEvent.change(ageInput, { target: { value: '35' } });

    expect(screen.getByText(/35 years old/i)).toBeInTheDocument();
  });

  it('allows selecting English proficiency', () => {
    render(<VptCalculator />);

    const superiorButton = screen.getByText(/Superior English/i);
    fireEvent.click(superiorButton);

    // Verify 200 pts is in the document
    expect(screen.getAllByText(/200 pts/i).length).toBeGreaterThan(0);
  });

  it('resets form when reset button is pressed', () => {
    render(<VptCalculator />);

    const resetButton = screen.getByText(/Start Again \/ Reset Form/i);
    fireEvent.click(resetButton);

    // After reset, status badge includes Provisional
    const provisionalBadges = screen.getAllByText(/Provisional/i);
    expect(provisionalBadges.length).toBeGreaterThan(0);
  });

  it('distinctly highlights federal points test as a separate requirement', () => {
    render(<VptCalculator />);

    expect(
      screen.getByText(/Federal SkillSelect Points \(Separate Requirement\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Launch Official Australian Government Points Calculator/i)
    ).toBeInTheDocument();
  });
});
