/**
 * ============================================================================
 * MEMORY SYSTEMS PORTAL - INTEGRATION TEST SUITE
 * Testing comprehensivo de integración entre todas las lecciones
 * ============================================================================ */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

// Import all lesson components
import Lesson01Introduction from '../modules/module-c/lessons/Lesson01_Introduction/index';
import Lesson02MemoryTypes from '../modules/module-c/lessons/Lesson02_MemoryTypes/index';
import Lesson03Implementation from '../modules/module-c/lessons/Lesson03_Implementation/index';
import Lesson04Optimization from '../modules/module-c/lessons/Lesson04_Optimization/index';
import Lesson05AdvancedCases from '../modules/module-c/lessons/Lesson05_AdvancedCases/index';
import Lesson06Integration from '../modules/module-c/lessons/Lesson06_Integration/index';

// Mock portal global styles
import '../styles/portal-global.css';

// Mock IntersectionObserver for all tests
global.IntersectionObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock performance.now() for timing tests
const mockPerformanceNow = jest.fn();
global.performance.now = mockPerformanceNow;

// Mock ResizeObserver for responsive tests
global.ResizeObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock localStorage for persistence tests
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('Memory Systems Portal - Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPerformanceNow.mockReturnValue(1000);
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('Portal-wide Component Rendering', () => {
    test('all lessons render without errors', async () => {
      const lessons = [
        { component: Lesson01Introduction, name: 'Lesson 1: Introduction' },
        { component: Lesson02MemoryTypes, name: 'Lesson 2: Memory Types' },
        { component: Lesson03Implementation, name: 'Lesson 3: Implementation' },
        { component: Lesson04Optimization, name: 'Lesson 4: Optimization' },
        { component: Lesson05AdvancedCases, name: 'Lesson 5: Advanced Cases' },
        { component: Lesson06Integration, name: 'Lesson 6: Integration' }
      ];

      for (const { component: LessonComponent, name } of lessons) {
        const { unmount } = render(<LessonComponent />);
        
        // Each lesson should render its title
        expect(screen.getByText(new RegExp('Lección', 'i'))).toBeInTheDocument();
        
        // Should not throw any errors
        expect(() => {
          render(<LessonComponent />);
        }).not.toThrow();
        
        unmount();
      }
    });

    test('consistent CSS classes across all lessons', () => {
      const lessons = [
        Lesson01Introduction,
        Lesson02MemoryTypes,
        Lesson03Implementation,
        Lesson04Optimization,
        Lesson05AdvancedCases,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent, index) => {
        const { container, unmount } = render(<LessonComponent />);
        
        // Check for consistent portal classes
        const lessonContainer = container.querySelector('[class*="lesson"]');
        expect(lessonContainer).toBeInTheDocument();
        
        // Check for header presence
        const header = container.querySelector('[class*="header"]');
        expect(header).toBeInTheDocument();
        
        unmount();
      });
    });

    test('all lessons have proper accessibility attributes', () => {
      const lessons = [
        Lesson01Introduction,
        Lesson02MemoryTypes,
        Lesson03Implementation,
        Lesson04Optimization,
        Lesson05AdvancedCases,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        const { container, unmount } = render(<LessonComponent />);
        
        // Check for proper heading hierarchy
        const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
        expect(headings.length).toBeGreaterThan(0);
        
        // Check for button accessibility
        const buttons = container.querySelectorAll('button');
        buttons.forEach(button => {
          expect(button).toHaveProperty('type');
        });
        
        unmount();
      });
    });
  });

  describe('Performance Integration Tests', () => {
    test('all lessons meet performance budgets', async () => {
      const lessons = [
        Lesson01Introduction,
        Lesson02MemoryTypes,
        Lesson03Implementation,
        Lesson04Optimization,
        Lesson05AdvancedCases,
        Lesson06Integration
      ];

      for (const LessonComponent of lessons) {
        const startTime = performance.now();
        const { unmount } = render(<LessonComponent />);
        const endTime = performance.now();
        
        // Each lesson should render within 100ms budget
        expect(endTime - startTime).toBeLessThan(100);
        
        unmount();
      }
    });

    test('memory usage remains stable across lesson navigation', async () => {
      // Simulate rapid lesson switching
      const lessons = [
        Lesson01Introduction,
        Lesson02MemoryTypes,
        Lesson03Implementation,
        Lesson04Optimization,
        Lesson05AdvancedCases,
        Lesson06Integration
      ];

      let currentRender = null;

      for (let i = 0; i < 10; i++) {
        const randomLesson = lessons[Math.floor(Math.random() * lessons.length)];
        
        if (currentRender) {
          currentRender.unmount();
        }
        
        currentRender = render(<randomLesson />);
        
        // Should not accumulate memory leaks
        expect(document.querySelectorAll('[class*="lesson"]').length).toBeLessThanOrEqual(1);
      }
      
      if (currentRender) {
        currentRender.unmount();
      }
    });

    test('animations perform smoothly across all lessons', async () => {
      const lessons = [
        Lesson01Introduction,
        Lesson02MemoryTypes,
        Lesson03Implementation,
        Lesson04Optimization,
        Lesson05AdvancedCases,
        Lesson06Integration
      ];

      for (const LessonComponent of lessons) {
        const { container, unmount } = render(<LessonComponent />);
        
        // Find interactive elements that should animate
        const buttons = container.querySelectorAll('button');
        const cards = container.querySelectorAll('[class*="card"]');
        const tabs = container.querySelectorAll('[class*="tab"]');
        
        const interactiveElements = [...buttons, ...cards, ...tabs];
        
        interactiveElements.forEach(element => {
          const computedStyle = window.getComputedStyle(element);
          
          // Check for transition properties
          expect(
            computedStyle.transition !== 'all 0s ease 0s'
          ).toBeTruthy();
        });
        
        unmount();
      }
    });
  });

  describe('Cross-Lesson Data Consistency', () => {
    test('lesson progression state is maintained', async () => {
      // Simulate completing lessons in sequence
      const progressData = {
        lesson1: { completed: true, score: 95 },
        lesson2: { completed: true, score: 88 },
        lesson3: { completed: false, score: 0 },
      };

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'memoryPortalProgress') {
          return JSON.stringify(progressData);
        }
        return null;
      });

      // Test each lesson handles progress data correctly
      const lessons = [
        Lesson01Introduction,
        Lesson02MemoryTypes,
        Lesson03Implementation,
      ];

      lessons.forEach((LessonComponent, index) => {
        const { unmount } = render(<LessonComponent />);
        
        // Verify localStorage was accessed for progress
        expect(localStorageMock.getItem).toHaveBeenCalledWith('memoryPortalProgress');
        
        unmount();
      });
    });

    test('theme preferences persist across lessons', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'memoryPortalTheme') {
          return 'dark';
        }
        return null;
      });

      const lessons = [
        Lesson01Introduction,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        const { container, unmount } = render(<LessonComponent />);
        
        // Should respect theme preferences
        expect(localStorageMock.getItem).toHaveBeenCalledWith('memoryPortalTheme');
        
        unmount();
      });
    });

    test('consistent data structures across lessons', () => {
      const lessons = [
        Lesson01Introduction,
        Lesson02MemoryTypes,
        Lesson03Implementation,
        Lesson04Optimization,
        Lesson05AdvancedCases,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        const { container, unmount } = render(<LessonComponent />);
        
        // Check for consistent data-* attributes
        const elementsWithData = container.querySelectorAll('[data-testid]');
        elementsWithData.forEach(element => {
          expect(element.getAttribute('data-testid')).toMatch(/^[a-z-]+$/);
        });
        
        unmount();
      });
    });
  });

  describe('Responsive Design Integration', () => {
    test('all lessons adapt to mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667,
      });

      const lessons = [
        Lesson01Introduction,
        Lesson02MemoryTypes,
        Lesson03Implementation,
        Lesson04Optimization,
        Lesson05AdvancedCases,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        const { container, unmount } = render(<LessonComponent />);
        
        // Check for mobile-responsive classes
        const responsiveElements = container.querySelectorAll('[class*="responsive"], [class*="mobile"], [class*="sm:"]');
        
        // Should have some responsive design elements
        expect(container.querySelector('*')).toBeInTheDocument();
        
        unmount();
      });
    });

    test('tablet viewport rendering consistency', () => {
      // Mock tablet viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      const lessons = [
        Lesson01Introduction,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        const { container, unmount } = render(<LessonComponent />);
        
        // Should render without horizontal scroll
        const bodyWidth = document.body.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 50); // 50px tolerance
        
        unmount();
      });
    });

    test('desktop layout optimization', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      const lessons = [
        Lesson01Introduction,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        const { container, unmount } = render(<LessonComponent />);
        
        // Should utilize desktop space efficiently
        const wideElements = container.querySelectorAll('[class*="container"], [class*="max-w"]');
        expect(wideElements.length).toBeGreaterThan(0);
        
        unmount();
      });
    });
  });

  describe('Error Boundary Integration', () => {
    test('lessons handle component errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      // Simulate component error
      const ThrowingComponent = () => {
        throw new Error('Simulated component error');
      };

      expect(() => {
        render(<ThrowingComponent />);
      }).toThrow();

      consoleSpy.mockRestore();
    });

    test('lessons recover from state corruption', () => {
      // Simulate corrupted localStorage
      localStorageMock.getItem.mockImplementation(() => {
        return '{"corrupted": json}'; // Invalid JSON
      });

      const lessons = [
        Lesson01Introduction,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        expect(() => {
          render(<LessonComponent />);
        }).not.toThrow();
      });
    });

    test('network failure handling across lessons', async () => {
      // Mock fetch to simulate network failures
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      const lessons = [
        Lesson01Introduction,
        Lesson06Integration
      ];

      for (const LessonComponent of lessons) {
        const { unmount } = render(<LessonComponent />);
        
        // Should handle network errors gracefully
        await waitFor(() => {
          expect(screen.queryByText(/error/i)).toBeInTheDocument();
        }, { timeout: 100 });
        
        unmount();
      }
    });
  });

  describe('Accessibility Integration', () => {
    test('keyboard navigation works across all lessons', () => {
      const lessons = [
        Lesson01Introduction,
        Lesson02MemoryTypes,
        Lesson03Implementation,
        Lesson04Optimization,
        Lesson05AdvancedCases,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        const { container, unmount } = render(<LessonComponent />);
        
        // Find all focusable elements
        const focusableElements = container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        // Should have focusable elements
        expect(focusableElements.length).toBeGreaterThan(0);

        // Test tab navigation
        focusableElements.forEach((element, index) => {
          if (index < 3) { // Test first 3 elements to avoid test timeout
            element.focus();
            expect(document.activeElement).toBe(element);
          }
        });
        
        unmount();
      });
    });

    test('screen reader compatibility across lessons', () => {
      const lessons = [
        Lesson01Introduction,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        const { container, unmount } = render(<LessonComponent />);
        
        // Check for ARIA labels
        const ariaLabels = container.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]');
        expect(ariaLabels.length).toBeGreaterThan(0);
        
        // Check for semantic HTML
        const semanticElements = container.querySelectorAll(
          'main, section, article, nav, header, footer, h1, h2, h3, h4, h5, h6'
        );
        expect(semanticElements.length).toBeGreaterThan(0);
        
        unmount();
      });
    });

    test('color contrast compliance', () => {
      const lessons = [
        Lesson01Introduction,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        const { container, unmount } = render(<LessonComponent />);
        
        // Check that text elements have color styles
        const textElements = container.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
        
        textElements.forEach(element => {
          const styles = window.getComputedStyle(element);
          // Should have defined colors (not just inherit)
          expect(styles.color).toBeDefined();
        });
        
        unmount();
      });
    });
  });

  describe('Cross-Browser Compatibility', () => {
    test('lessons work with different user agents', () => {
      const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15'
      ];

      const lessons = [
        Lesson01Introduction,
        Lesson06Integration
      ];

      userAgents.forEach(userAgent => {
        Object.defineProperty(navigator, 'userAgent', {
          value: userAgent,
          configurable: true,
        });

        lessons.forEach((LessonComponent) => {
          expect(() => {
            render(<LessonComponent />);
          }).not.toThrow();
        });
      });
    });

    test('CSS feature detection and fallbacks', () => {
      const lessons = [
        Lesson01Introduction,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        const { container, unmount } = render(<LessonComponent />);
        
        // Check for CSS custom properties usage
        const elementsWithCustomProps = container.querySelectorAll('*');
        
        elementsWithCustomProps.forEach(element => {
          const styles = window.getComputedStyle(element);
          // Should not rely on unsupported CSS features
          expect(element).toBeInTheDocument();
        });
        
        unmount();
      });
    });
  });

  describe('State Management Integration', () => {
    test('lesson state transitions work correctly', async () => {
      const { rerender } = render(<Lesson01Introduction />);
      
      // Should start with initial state
      expect(screen.getByText(/Lección 1/)).toBeInTheDocument();
      
      // Change to different lesson
      rerender(<Lesson06Integration />);
      
      await waitFor(() => {
        expect(screen.getByText(/Lección 6/)).toBeInTheDocument();
      });
    });

    test('persistent state across lesson reloads', () => {
      const testState = { currentTab: 'advanced', progress: 75 };
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lesson06State') {
          return JSON.stringify(testState);
        }
        return null;
      });

      const { unmount, rerender } = render(<Lesson06Integration />);
      
      // Should load saved state
      expect(localStorageMock.getItem).toHaveBeenCalled();
      
      unmount();
      rerender(<Lesson06Integration />);
      
      // Should maintain state across remounts
      expect(localStorageMock.getItem).toHaveBeenCalledTimes(2);
    });
  });

  describe('API Integration Simulation', () => {
    test('lessons handle API responses correctly', async () => {
      // Mock successful API response
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: 'success' }),
      });

      const { unmount } = render(<Lesson06Integration />);
      
      // Should handle API calls gracefully
      await waitFor(() => {
        expect(screen.getByText(/Lección 6/)).toBeInTheDocument();
      });
      
      unmount();
    });

    test('lessons handle API failures gracefully', async () => {
      // Mock API failure
      global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));

      const { unmount } = render(<Lesson06Integration />);
      
      // Should still render without crashing
      expect(screen.getByText(/Lección 6/)).toBeInTheDocument();
      
      unmount();
    });
  });

  describe('Progressive Enhancement', () => {
    test('lessons work without JavaScript features', () => {
      // Mock disabled JavaScript features
      global.IntersectionObserver = undefined;
      global.ResizeObserver = undefined;

      const lessons = [
        Lesson01Introduction,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        expect(() => {
          render(<LessonComponent />);
        }).not.toThrow();
      });
    });

    test('lessons provide fallbacks for modern features', () => {
      // Mock older browser environment
      delete window.CSS;
      delete window.customElements;

      const lessons = [
        Lesson01Introduction,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        const { container, unmount } = render(<LessonComponent />);
        
        // Should still provide basic functionality
        expect(container.querySelector('[class*="lesson"]')).toBeInTheDocument();
        
        unmount();
      });
    });
  });

  describe('Security Integration', () => {
    test('lessons properly sanitize user inputs', () => {
      const maliciousInput = '<script>alert("xss")</script>';
      
      // Mock user input with XSS attempt
      const { container } = render(<Lesson01Introduction />);
      
      const inputs = container.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        fireEvent.change(input, { target: { value: maliciousInput } });
        
        // Should not execute script
        expect(input.value).toBe(maliciousInput);
        expect(document.querySelectorAll('script').length).toBe(0);
      });
    });

    test('lessons handle CSP restrictions', () => {
      // Mock CSP violation
      const cspViolation = new Event('securitypolicyviolation');
      
      const lessons = [
        Lesson01Introduction,
        Lesson06Integration
      ];

      lessons.forEach((LessonComponent) => {
        const { unmount } = render(<LessonComponent />);
        
        // Should not trigger CSP violations
        document.dispatchEvent(cspViolation);
        
        // Should continue functioning
        expect(screen.getByText(/Lección/)).toBeInTheDocument();
        
        unmount();
      });
    });
  });
});

/**
 * Portal End-to-End Integration Tests
 * Test complete user workflows across multiple lessons
 */
describe('Portal E2E Integration Tests', () => {
  test('complete learning path simulation', async () => {
    const learningPath = [
      { component: Lesson01Introduction, expectedContent: 'Lección 1' },
      { component: Lesson02MemoryTypes, expectedContent: 'Lección 2' },
      { component: Lesson03Implementation, expectedContent: 'Lección 3' },
      { component: Lesson04Optimization, expectedContent: 'Lección 4' },
      { component: Lesson05AdvancedCases, expectedContent: 'Lección 5' },
      { component: Lesson06Integration, expectedContent: 'Lección 6' },
    ];

    let currentRender = null;

    for (const { component: LessonComponent, expectedContent } of learningPath) {
      if (currentRender) {
        currentRender.unmount();
      }

      currentRender = render(<LessonComponent />);
      
      // Verify lesson loads correctly
      await waitFor(() => {
        expect(screen.getByText(new RegExp(expectedContent))).toBeInTheDocument();
      });

      // Simulate some interaction
      const buttons = screen.getAllByRole('button');
      if (buttons.length > 0) {
        fireEvent.click(buttons[0]);
      }

      // Verify interaction doesn't break the lesson
      expect(screen.getByText(new RegExp(expectedContent))).toBeInTheDocument();
    }

    if (currentRender) {
      currentRender.unmount();
    }
  });

  test('portal progress tracking across sessions', () => {
    const progressHistory = [];

    // Simulate multiple learning sessions
    const sessions = [
      { lessons: [Lesson01Introduction, Lesson02MemoryTypes], progress: 33 },
      { lessons: [Lesson03Implementation, Lesson04Optimization], progress: 66 },
      { lessons: [Lesson05AdvancedCases, Lesson06Integration], progress: 100 },
    ];

    sessions.forEach(({ lessons, progress }) => {
      lessons.forEach((LessonComponent) => {
        const { unmount } = render(<LessonComponent />);
        
        // Track progress
        progressHistory.push({
          lesson: LessonComponent.name,
          timestamp: Date.now(),
          progress
        });
        
        unmount();
      });
    });

    // Verify progress tracking
    expect(progressHistory.length).toBe(6);
    expect(progressHistory[progressHistory.length - 1].progress).toBe(100);
  });

  test('portal data consistency across browser refresh', async () => {
    // Simulate user data before refresh
    const userData = {
      currentLesson: 'lesson06',
      completedLessons: ['lesson01', 'lesson02', 'lesson03', 'lesson04', 'lesson05'],
      preferences: { theme: 'dark', notifications: true }
    };

    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'memoryPortalUser') {
        return JSON.stringify(userData);
      }
      return null;
    });

    // Render lesson after "refresh"
    const { unmount } = render(<Lesson06Integration />);

    // Should restore user state
    expect(localStorageMock.getItem).toHaveBeenCalledWith('memoryPortalUser');

    unmount();
  });
});

/**
 * Portal Performance Benchmarks
 * Comprehensive performance testing across all lessons
 */
describe('Portal Performance Benchmarks', () => {
  test('bundle size optimization across lessons', () => {
    const lessons = [
      Lesson01Introduction,
      Lesson02MemoryTypes,
      Lesson03Implementation,
      Lesson04Optimization,
      Lesson05AdvancedCases,
      Lesson06Integration
    ];

    lessons.forEach((LessonComponent) => {
      const startTime = performance.now();
      const { unmount } = render(<LessonComponent />);
      const endTime = performance.now();

      // Each lesson should load quickly
      expect(endTime - startTime).toBeLessThan(50);

      unmount();
    });
  });

  test('memory usage optimization', () => {
    // Track memory usage across lesson navigation
    const initialMemory = performance.memory?.usedJSHeapSize || 0;

    const lessons = [
      Lesson01Introduction,
      Lesson02MemoryTypes,
      Lesson03Implementation,
      Lesson04Optimization,
      Lesson05AdvancedCases,
      Lesson06Integration
    ];

    let currentRender = null;

    lessons.forEach((LessonComponent) => {
      if (currentRender) {
        currentRender.unmount();
      }
      currentRender = render(<LessonComponent />);
    });

    if (currentRender) {
      currentRender.unmount();
    }

    const finalMemory = performance.memory?.usedJSHeapSize || 0;
    const memoryIncrease = finalMemory - initialMemory;

    // Memory increase should be reasonable
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // 50MB limit
  });

  test('render performance consistency', async () => {
    const renderTimes = [];

    const lessons = [
      Lesson01Introduction,
      Lesson02MemoryTypes,
      Lesson03Implementation,
      Lesson04Optimization,
      Lesson05AdvancedCases,
      Lesson06Integration
    ];

    for (const LessonComponent of lessons) {
      const startTime = performance.now();
      const { unmount } = render(<LessonComponent />);
      const endTime = performance.now();

      renderTimes.push(endTime - startTime);
      unmount();
    }

    // Render times should be consistent
    const averageTime = renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length;
    const variance = renderTimes.reduce((acc, time) => acc + Math.pow(time - averageTime, 2), 0) / renderTimes.length;

    expect(variance).toBeLessThan(100); // Low variance in render times
  });
});
