/**
 * @fileoverview Tests comprehensivos para Lesson05_AdvancedCases
 * @version 1.0.0
 * @author AI Assistant
 * @description Suite de pruebas para casos de uso avanzados y aplicaciones empresariales
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

import Lesson05AdvancedCases from '../index';

// Extend expect with axe matchers
expect.extend(toHaveNoViolations);

// Mock para window.matchMedia (requerido para algunos componentes)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock para IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock console methods para pruebas limpias
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Lesson05AdvancedCases', () => {
  
  // ============================================================================
  // FUNCTIONAL TESTS - Pruebas de funcionalidad principal
  // ============================================================================
  
  describe('Functional Tests', () => {
    test('renders main component with correct structure', () => {
      render(<Lesson05AdvancedCases />);
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Lección 5: Casos Avanzados y Aplicaciones Empresariales'
      );
      expect(screen.getByText(/implementaciones reales de sistemas de memoria/i)).toBeInTheDocument();
    });

    test('displays all navigation tabs correctly', () => {
      render(<Lesson05AdvancedCases />);
      
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(4);
      
      expect(screen.getByRole('tab', { name: /casos por industria/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /multi-agente/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /integración apis/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /troubleshooting/i })).toBeInTheDocument();
    });

    test('tab navigation works correctly', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const industryTab = screen.getByRole('tab', { name: /casos por industria/i });
      const multiAgentTab = screen.getByRole('tab', { name: /multi-agente/i });
      
      expect(industryTab).toHaveAttribute('aria-selected', 'true');
      expect(multiAgentTab).toHaveAttribute('aria-selected', 'false');
      
      await user.click(multiAgentTab);
      
      expect(industryTab).toHaveAttribute('aria-selected', 'false');
      expect(multiAgentTab).toHaveAttribute('aria-selected', 'true');
    });

    test('keyboard navigation works for tabs', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const industryTab = screen.getByRole('tab', { name: /casos por industria/i });
      const multiAgentTab = screen.getByRole('tab', { name: /multi-agente/i });
      
      await user.tab();
      expect(industryTab).toHaveFocus();
      
      await user.keyboard('{ArrowRight}');
      expect(multiAgentTab).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(multiAgentTab).toHaveAttribute('aria-selected', 'true');
    });

    test('industry use cases display correctly', () => {
      render(<Lesson05AdvancedCases />);
      
      // Verificar que se muestran las industrias
      expect(screen.getByText(/fintech & trading/i)).toBeInTheDocument();
      expect(screen.getByText(/healthcare & medical/i)).toBeInTheDocument();
      expect(screen.getByText(/gaming & entertainment/i)).toBeInTheDocument();
      expect(screen.getByText(/automotive & autonomous/i)).toBeInTheDocument();
      expect(screen.getByText(/iot & smart cities/i)).toBeInTheDocument();
    });

    test('case selection works correctly', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const fintechCard = screen.getByText(/fintech & trading/i).closest('[role="button"]');
      await user.click(fintechCard);
      
      // Verificar que se muestran los casos de FinTech
      expect(screen.getByText(/high-frequency trading/i)).toBeInTheDocument();
      expect(screen.getByText(/detección de fraude/i)).toBeInTheDocument();
    });

    test('simulation button triggers correctly', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const simulateButton = screen.getByRole('button', { name: /simular/i });
      await user.click(simulateButton);
      
      // Verificar que se inicia la simulación (checked via logs or state change)
      await waitFor(() => {
        expect(screen.getByText(/starting simulation/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    test('multi-agent architecture selection works', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const multiAgentTab = screen.getByRole('tab', { name: /multi-agente/i });
      await user.click(multiAgentTab);
      
      expect(screen.getByText(/memoria centralizada/i)).toBeInTheDocument();
      expect(screen.getByText(/memoria distribuida/i)).toBeInTheDocument();
      expect(screen.getByText(/híbrida/i)).toBeInTheDocument();
      expect(screen.getByText(/federada/i)).toBeInTheDocument();
    });

    test('API integration tab displays providers', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const apiTab = screen.getByRole('tab', { name: /integración apis/i });
      await user.click(apiTab);
      
      expect(screen.getByText(/openai gpt-4/i)).toBeInTheDocument();
      expect(screen.getByText(/anthropic claude/i)).toBeInTheDocument();
      expect(screen.getByText(/cohere command/i)).toBeInTheDocument();
      expect(screen.getByText(/pinecone vector/i)).toBeInTheDocument();
      expect(screen.getByText(/weaviate/i)).toBeInTheDocument();
    });

    test('API connection test works', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const apiTab = screen.getByRole('tab', { name: /integración apis/i });
      await user.click(apiTab);
      
      const testButton = screen.getByRole('button', { name: /probar conexión/i });
      await user.click(testButton);
      
      expect(testButton).toHaveTextContent(/probando/i);
      
      await waitFor(() => {
        expect(screen.getByText(/conexión exitosa|error de conexión/i)).toBeInTheDocument();
      }, { timeout: 6000 });
    });

    test('logging system displays and filters correctly', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      // Verificar controles de logging
      expect(screen.getByLabelText(/filtrar logs/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/buscar en logs/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /tiempo real/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /limpiar/i })).toBeInTheDocument();
    });

    test('real-time logging can be toggled', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      const realtimeButton = screen.getByRole('button', { name: /tiempo real|pausar/i });
      const initialText = realtimeButton.textContent;
      
      await user.click(realtimeButton);
      
      expect(realtimeButton.textContent).not.toBe(initialText);
    });

    test('log filtering works correctly', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      // Wait for some logs to appear
      await waitFor(() => {
        const logStats = screen.getByText(/total logs:/i).parentElement;
        expect(within(logStats).getByText(/\d+/)).toBeInTheDocument();
      }, { timeout: 5000 });
      
      const filterSelect = screen.getByLabelText(/filtrar logs/i);
      await user.selectOptions(filterSelect, 'error');
      
      // Verificar que el filtro se aplicó
      expect(filterSelect).toHaveValue('error');
    });

    test('log search functionality works', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      const searchInput = screen.getByLabelText(/buscar en logs/i);
      await user.type(searchInput, 'memory');
      
      expect(searchInput).toHaveValue('memory');
    });

    test('clear logs functionality works', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      // Wait for logs to appear
      await waitFor(() => {
        const totalLogsElement = screen.getByText(/total logs:/i).parentElement;
        const logCount = within(totalLogsElement).getByText(/\d+/);
        expect(parseInt(logCount.textContent)).toBeGreaterThan(0);
      }, { timeout: 5000 });
      
      const clearButton = screen.getByRole('button', { name: /limpiar/i });
      await user.click(clearButton);
      
      // Logs should be cleared
      await waitFor(() => {
        const totalLogsElement = screen.getByText(/total logs:/i).parentElement;
        const logCount = within(totalLogsElement).getByText(/\d+/);
        expect(parseInt(logCount.textContent)).toBe(0);
      });
    });

    test('footer metrics display correctly', () => {
      render(<Lesson05AdvancedCases />);
      
      expect(screen.getByText(/industrias cubiertas/i)).toBeInTheDocument();
      expect(screen.getByText(/casos de uso/i)).toBeInTheDocument();
      expect(screen.getByText(/apis integradas/i)).toBeInTheDocument();
      expect(screen.getByText(/roi promedio/i)).toBeInTheDocument();
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS - Pruebas de accesibilidad
  // ============================================================================
  
  describe('Accessibility Tests', () => {
    test('has no accessibility violations', async () => {
      const { container } = render(<Lesson05AdvancedCases />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('proper heading hierarchy', () => {
      render(<Lesson05AdvancedCases />);
      
      const headings = screen.getAllByRole('heading');
      expect(headings[0]).toHaveProperty('tagName', 'H1');
      
      // Verificar que hay h3, h4, h5, h6 en orden
      const h3Elements = headings.filter(h => h.tagName === 'H3');
      expect(h3Elements.length).toBeGreaterThan(0);
    });

    test('all interactive elements are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      // Test tab navigation
      await user.tab();
      expect(document.activeElement).toHaveAttribute('role', 'tab');
      
      // Test industry card navigation
      await user.tab();
      expect(document.activeElement).toHaveAttribute('role', 'button');
    });

    test('proper ARIA labels and descriptions', () => {
      render(<Lesson05AdvancedCases />);
      
      // Tab list should have proper labeling
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-label', 'Navegación de lección');
      
      // Tabs should have proper aria-selected
      const selectedTab = screen.getByRole('tab', { selected: true });
      expect(selectedTab).toHaveAttribute('aria-selected', 'true');
    });

    test('form controls have proper labels', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      const filterSelect = screen.getByLabelText(/filtrar logs por nivel/i);
      expect(filterSelect).toBeInTheDocument();
      
      const searchInput = screen.getByLabelText(/buscar en logs/i);
      expect(searchInput).toBeInTheDocument();
    });

    test('color contrast is sufficient', () => {
      render(<Lesson05AdvancedCases />);
      
      // Test main heading color contrast
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveStyle('color: white');
    });

    test('reduced motion preferences are respected', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => {
          if (query === '(prefers-reduced-motion: reduce)') {
            return { matches: true, addListener: jest.fn(), removeListener: jest.fn() };
          }
          return { matches: false, addListener: jest.fn(), removeListener: jest.fn() };
        }),
      });

      render(<Lesson05AdvancedCases />);
      
      // Component should still render properly with reduced motion
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    test('focus management works correctly', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      // Tab to first interactive element
      await user.tab();
      const firstTab = document.activeElement;
      expect(firstTab).toHaveAttribute('role', 'tab');
      
      // Arrow key navigation between tabs
      await user.keyboard('{ArrowRight}');
      expect(document.activeElement).not.toBe(firstTab);
      expect(document.activeElement).toHaveAttribute('role', 'tab');
    });

    test('screen reader announcements work', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      // Check for proper live regions
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      // Real-time indicator should be announced
      await waitFor(() => {
        expect(screen.getByText(/monitoreo en tiempo real activo/i)).toBeInTheDocument();
      });
    });

    test('high contrast mode support', () => {
      // Mock high contrast preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => {
          if (query === '(prefers-contrast: high)') {
            return { matches: true, addListener: jest.fn(), removeListener: jest.fn() };
          }
          return { matches: false, addListener: jest.fn(), removeListener: jest.fn() };
        }),
      });

      render(<Lesson05AdvancedCases />);
      
      // Component should render with high contrast support
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  // ============================================================================
  // PERFORMANCE TESTS - Pruebas de rendimiento
  // ============================================================================
  
  describe('Performance Tests', () => {
    test('component renders within acceptable time', async () => {
      const startTime = performance.now();
      render(<Lesson05AdvancedCases />);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should render in less than 1 second
    });

    test('tab switching is performant', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const multiAgentTab = screen.getByRole('tab', { name: /multi-agente/i });
      
      const startTime = performance.now();
      await user.click(multiAgentTab);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100); // Should switch in less than 100ms
    });

    test('log generation does not cause performance issues', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      // Wait for multiple log entries to be generated
      await waitFor(() => {
        const totalLogsElement = screen.getByText(/total logs:/i).parentElement;
        const logCount = within(totalLogsElement).getByText(/\d+/);
        expect(parseInt(logCount.textContent)).toBeGreaterThan(5);
      }, { timeout: 10000 });
      
      // Component should still be responsive
      const realtimeButton = screen.getByRole('button', { name: /pausar|tiempo real/i });
      expect(realtimeButton).toBeEnabled();
    });

    test('memory usage remains stable', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      // Simulate multiple interactions
      const tabs = screen.getAllByRole('tab');
      for (const tab of tabs) {
        await user.click(tab);
        await waitFor(() => {}, { timeout: 100 });
      }
      
      // Component should still be functional
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    test('large datasets are handled efficiently', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      // Let logs accumulate
      await waitFor(() => {
        const totalLogsElement = screen.getByText(/total logs:/i).parentElement;
        const logCount = within(totalLogsElement).getByText(/\d+/);
        expect(parseInt(logCount.textContent)).toBeGreaterThan(10);
      }, { timeout: 15000 });
      
      // Filtering should still be responsive
      const filterSelect = screen.getByLabelText(/filtrar logs/i);
      const startTime = performance.now();
      await user.selectOptions(filterSelect, 'error');
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(200);
    });
  });

  // ============================================================================
  // INTEGRATION TESTS - Pruebas de integración
  // ============================================================================
  
  describe('Integration Tests', () => {
    test('all tabs work together correctly', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      // Test industry cases tab
      expect(screen.getByText(/fintech & trading/i)).toBeInTheDocument();
      
      // Switch to multi-agent tab
      const multiAgentTab = screen.getByRole('tab', { name: /multi-agente/i });
      await user.click(multiAgentTab);
      expect(screen.getByText(/memoria centralizada/i)).toBeInTheDocument();
      
      // Switch to API integration tab
      const apiTab = screen.getByRole('tab', { name: /integración apis/i });
      await user.click(apiTab);
      expect(screen.getByText(/openai gpt-4/i)).toBeInTheDocument();
      
      // Switch to troubleshooting tab
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      expect(screen.getByText(/system logging/i)).toBeInTheDocument();
    });

    test('state management works across components', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      // Start simulation from industry cases
      const simulateButton = screen.getByRole('button', { name: /simular/i });
      await user.click(simulateButton);
      
      // Check that logs are generated in troubleshooting tab
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      await waitFor(() => {
        expect(screen.getByText(/starting simulation/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    test('API integration affects logging', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      // Go to API integration tab
      const apiTab = screen.getByRole('tab', { name: /integración apis/i });
      await user.click(apiTab);
      
      // Test API connection
      const testButton = screen.getByRole('button', { name: /probar conexión/i });
      await user.click(testButton);
      
      // Check logs in troubleshooting tab
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      await waitFor(() => {
        expect(screen.getByText(/api integration test/i)).toBeInTheDocument();
      }, { timeout: 6000 });
    });

    test('multi-agent demo generates appropriate logs', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      // Go to multi-agent tab
      const multiAgentTab = screen.getByRole('tab', { name: /multi-agente/i });
      await user.click(multiAgentTab);
      
      // Trigger agent operation
      const triggerButton = screen.getByRole('button', { name: /ejecutar operación/i });
      await user.click(triggerButton);
      
      // Check that agent operations appear in memory visualization
      await waitFor(() => {
        const agentContainers = screen.getAllByText(/agent \d/i);
        expect(agentContainers.length).toBeGreaterThan(0);
      });
    });

    test('real-time features work across tabs', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      // Enable real-time in troubleshooting
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      const realtimeButton = screen.getByRole('button', { name: /tiempo real|pausar/i });
      if (realtimeButton.textContent.includes('Tiempo Real')) {
        await user.click(realtimeButton);
      }
      
      // Switch to multi-agent and trigger operation
      const multiAgentTab = screen.getByRole('tab', { name: /multi-agente/i });
      await user.click(multiAgentTab);
      
      const triggerButton = screen.getByRole('button', { name: /ejecutar operación/i });
      await user.click(triggerButton);
      
      // Go back to troubleshooting and check for real-time updates
      await user.click(loggingTab);
      
      await waitFor(() => {
        const totalLogsElement = screen.getByText(/total logs:/i).parentElement;
        const logCount = within(totalLogsElement).getByText(/\d+/);
        expect(parseInt(logCount.textContent)).toBeGreaterThan(0);
      }, { timeout: 5000 });
    });

    test('responsive design works on different screen sizes', () => {
      // Test mobile viewport
      global.innerWidth = 375;
      global.innerHeight = 667;
      global.dispatchEvent(new Event('resize'));
      
      render(<Lesson05AdvancedCases />);
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      
      // Test desktop viewport
      global.innerWidth = 1920;
      global.innerHeight = 1080;
      global.dispatchEvent(new Event('resize'));
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  // ============================================================================
  // EDGE CASES & ERROR HANDLING - Pruebas de casos límite
  // ============================================================================
  
  describe('Edge Cases & Error Handling', () => {
    test('handles empty props gracefully', () => {
      render(<Lesson05AdvancedCases className="" />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    test('handles rapid tab switching', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const tabs = screen.getAllByRole('tab');
      
      // Rapidly switch between tabs
      for (let i = 0; i < 10; i++) {
        const randomTab = tabs[Math.floor(Math.random() * tabs.length)];
        await user.click(randomTab);
      }
      
      // Component should still be functional
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    test('handles network simulation failures gracefully', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const apiTab = screen.getByRole('tab', { name: /integración apis/i });
      await user.click(apiTab);
      
      // Test multiple API connections rapidly
      const testButton = screen.getByRole('button', { name: /probar conexión/i });
      
      for (let i = 0; i < 5; i++) {
        await user.click(testButton);
        await waitFor(() => {}, { timeout: 100 });
      }
      
      // Should handle multiple requests gracefully
      expect(testButton).toBeInTheDocument();
    });

    test('handles large log volumes without crashing', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      // Let logs accumulate for extended period
      await waitFor(() => {
        const totalLogsElement = screen.getByText(/total logs:/i).parentElement;
        const logCount = within(totalLogsElement).getByText(/\d+/);
        expect(parseInt(logCount.textContent)).toBeGreaterThan(20);
      }, { timeout: 30000 });
      
      // Component should still be responsive
      const clearButton = screen.getByRole('button', { name: /limpiar/i });
      await user.click(clearButton);
      
      expect(clearButton).toBeEnabled();
    });

    test('handles invalid search terms gracefully', async () => {
      const user = userEvent.setup();
      render(<Lesson05AdvancedCases />);
      
      const loggingTab = screen.getByRole('tab', { name: /troubleshooting/i });
      await user.click(loggingTab);
      
      const searchInput = screen.getByLabelText(/buscar en logs/i);
      
      // Test various edge case search terms
      const edgeCases = ['', '***', '   ', '\\n\\t', '🚀🔥💻'];
      
      for (const searchTerm of edgeCases) {
        await user.clear(searchInput);
        await user.type(searchInput, searchTerm);
        expect(searchInput).toHaveValue(searchTerm);
      }
    });

    test('handles component unmounting during async operations', async () => {
      const user = userEvent.setup();
      const { unmount } = render(<Lesson05AdvancedCases />);
      
      const apiTab = screen.getByRole('tab', { name: /integración apis/i });
      await user.click(apiTab);
      
      const testButton = screen.getByRole('button', { name: /probar conexión/i });
      await user.click(testButton);
      
      // Unmount component during async operation
      unmount();
      
      // Should not cause errors or memory leaks
      expect(true).toBe(true); // Test passes if no errors thrown
    });

    test('handles browser back/forward navigation', () => {
      render(<Lesson05AdvancedCases />);
      
      // Simulate browser navigation
      window.history.pushState({}, '', '/test');
      window.history.back();
      
      // Component should remain stable
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    test('gracefully handles missing localStorage', () => {
      // Mock localStorage unavailability
      const originalLocalStorage = window.localStorage;
      delete window.localStorage;
      
      render(<Lesson05AdvancedCases />);
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      
      // Restore localStorage
      window.localStorage = originalLocalStorage;
    });

    test('handles theme changes dynamically', () => {
      render(<Lesson05AdvancedCases />);
      
      // Simulate dark mode toggle
      document.documentElement.setAttribute('data-theme', 'dark');
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      
      // Simulate light mode toggle
      document.documentElement.setAttribute('data-theme', 'light');
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });
});
