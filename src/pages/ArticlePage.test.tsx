import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import ArticlePage from './ArticlePage';

const testArticleContent = `
DUPLICATE TITLE:
DUPLICATE TITLE?
* A list item
* A list item
Another paragraph.
Another paragraph.
`;

describe('ArticlePage', () => {
  const originalConsoleError = console.error;
  let consoleErrorOutput: string[] = [];

  beforeAll(() => {
    console.error = (message) => {
      consoleErrorOutput.push(message as string);
      originalConsoleError(message);
    };

    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(testArticleContent),
      } as Response)
    );
  });

  afterAll(() => {
    console.error = originalConsoleError;
    vi.restoreAllMocks();
  });

  it('should not show a warning for duplicate keys', async () => {
    consoleErrorOutput = [];
    render(<ArticlePage articleId="test-article" />);

    await waitFor(() => {
      // Use getAllByText to avoid ambiguity errors, as the title appears in the sidebar and body.
      expect(screen.getAllByText('DUPLICATE TITLE:')[0]).toBeInTheDocument();
    });

    const hasDuplicateKeyWarning = consoleErrorOutput.some(msg =>
      msg.includes('Encountered two children with the same key')
    );

    expect(hasDuplicateKeyWarning).toBe(false);
  });
});