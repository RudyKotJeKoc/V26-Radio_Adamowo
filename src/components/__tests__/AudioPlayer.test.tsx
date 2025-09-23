import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AudioPlayerProvider } from '../../context/AudioPlayerContext';

// Simple test to verify the testing setup works
describe('AudioPlayer Context', () => {
  it('provides audio player context to children', () => {
    render(
      <AudioPlayerProvider>
        <div data-testid="test-child">Test Content</div>
      </AudioPlayerProvider>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
});