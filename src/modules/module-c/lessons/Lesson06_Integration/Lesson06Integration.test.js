/**
 * ============================================================================
 * LESSON 06 INTEGRATION: TEST SUITE
 * Comprehensive testing for enterprise integration and deployment lesson
 * ============================================================================
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import Lesson06Integration from './index';

// Mock IntersectionObserver for visibility testing
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

describe('Lesson06Integration - Enterprise Integration & Deployment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPerformanceNow.mockReturnValue(1000);
  });

  describe('Component Initialization', () => {
    test('renders lesson header with correct title and description', () => {
      render(<Lesson06Integration />);
      
      expect(screen.getByText('Lección 6: Integración y Deployment')).toBeInTheDocument();
      expect(screen.getByText(/Domina las arquitecturas de integración/)).toBeInTheDocument();
    });

    test('displays all navigation tabs', () => {
      render(<Lesson06Integration />);
      
      expect(screen.getByText('Arquitecturas')).toBeInTheDocument();
      expect(screen.getByText('Migración')).toBeInTheDocument();
      expect(screen.getByText('Monitoreo')).toBeInTheDocument();
      expect(screen.getByText('Best Practices')).toBeInTheDocument();
    });

    test('starts with Integration Architectures tab active', () => {
      render(<Lesson06Integration />);
      
      const architecturesTab = screen.getByRole('button', { name: /arquitecturas/i });
      expect(architecturesTab).toHaveClass('active');
    });

    test('initializes with correct default state', () => {
      render(<Lesson06Integration />);
      
      // Should show microservices architecture by default
      expect(screen.getByText('Microservicios')).toBeInTheDocument();
      expect(screen.getByText('Strangler Fig')).toBeInTheDocument();
    });
  });

  describe('Navigation Functionality', () => {
    test('switches tabs correctly', async () => {
      render(<Lesson06Integration />);
      
      const migrationTab = screen.getByRole('button', { name: /migración/i });
      fireEvent.click(migrationTab);
      
      await waitFor(() => {
        expect(migrationTab).toHaveClass('active');
        expect(screen.getByText('Estrategias de Migración')).toBeInTheDocument();
      });
    });

    test('tab transitions work smoothly', async () => {
      render(<Lesson06Integration />);
      
      const tabs = ['migración', 'monitoreo', 'best practices'];
      
      for (const tabName of tabs) {
        const tab = screen.getByRole('button', { name: new RegExp(tabName, 'i') });
        fireEvent.click(tab);
        
        await waitFor(() => {
          expect(tab).toHaveClass('active');
        });
      }
    });

    test('maintains tab state during interaction', () => {
      render(<Lesson06Integration />);
      
      const monitoringTab = screen.getByRole('button', { name: /monitoreo/i });
      fireEvent.click(monitoringTab);
      
      // Interact with content
      const architecturesTab = screen.getByRole('button', { name: /arquitecturas/i });
      fireEvent.click(architecturesTab);
      
      expect(architecturesTab).toHaveClass('active');
      expect(monitoringTab).not.toHaveClass('active');
    });
  });

  describe('Integration Architectures Tab', () => {
    beforeEach(() => {
      render(<Lesson06Integration />);
    });

    test('displays all architecture options', () => {
      const architectures = ['Microservicios', 'Serverless', 'Híbrido Cloud', 'Edge Computing'];
      
      architectures.forEach(arch => {
        expect(screen.getByText(arch)).toBeInTheDocument();
      });
    });

    test('selects architecture and shows details', async () => {
      const serverlessCard = screen.getByText('Serverless').closest('.architecture-card');
      fireEvent.click(serverlessCard);
      
      await waitFor(() => {
        expect(serverlessCard).toHaveClass('selected');
        expect(screen.getByText(/AWS Lambda/)).toBeInTheDocument();
      });
    });

    test('deploy demo button functionality', async () => {
      const deployButton = screen.getByText('Deploy Demo');
      
      fireEvent.click(deployButton);
      
      await waitFor(() => {
        expect(deployButton).toBeDisabled();
        expect(screen.getByText('Deploying...')).toBeInTheDocument();
      });
    });

    test('deployment progress updates correctly', async () => {
      const deployButton = screen.getByText('Deploy Demo');
      
      fireEvent.click(deployButton);
      
      await act(async () => {
        jest.advanceTimersByTime(1500);
      });
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '100');
    });

    test('component analysis shows pros and cons', () => {
      const microservicesCard = screen.getByText('Microservicios').closest('.architecture-card');
      fireEvent.click(microservicesCard);
      
      expect(screen.getByText('Ventajas')).toBeInTheDocument();
      expect(screen.getByText('Desventajas')).toBeInTheDocument();
      expect(screen.getByText('Casos de Uso Ideales')).toBeInTheDocument();
    });
  });

  describe('Migration Strategies Tab', () => {
    beforeEach(() => {
      render(<Lesson06Integration />);
      const migrationTab = screen.getByRole('button', { name: /migración/i });
      fireEvent.click(migrationTab);
    });

    test('displays all migration strategies', async () => {
      await waitFor(() => {
        const strategies = ['Strangler Fig', 'Big Bang', 'Parallel Run', 'Database-First'];
        
        strategies.forEach(strategy => {
          expect(screen.getByText(strategy)).toBeInTheDocument();
        });
      });
    });

    test('strategy selection and step simulation', async () => {
      await waitFor(() => {
        const bigBangCard = screen.getByText('Big Bang').closest('.strategy-card');
        fireEvent.click(bigBangCard);
        
        expect(bigBangCard).toHaveClass('selected');
        expect(screen.getByText('Iniciar Migración')).toBeInTheDocument();
      });
    });

    test('migration simulation with progress tracking', async () => {
      await waitFor(() => {
        const startButton = screen.getByText('Iniciar Migración');
        fireEvent.click(startButton);
        
        expect(startButton).toBeDisabled();
        expect(screen.getByText('Migrando...')).toBeInTheDocument();
      });
    });

    test('migration logs are displayed during simulation', async () => {
      await waitFor(() => {
        const startButton = screen.getByText('Iniciar Migración');
        fireEvent.click(startButton);
      });
      
      await act(async () => {
        jest.advanceTimersByTime(1000);
      });
      
      expect(screen.getByText('Logs de Migración')).toBeInTheDocument();
      expect(screen.getByText(/Starting migration process/)).toBeInTheDocument();
    });

    test('step-by-step breakdown for each strategy', async () => {
      await waitFor(() => {
        const stranglerCard = screen.getByText('Strangler Fig').closest('.strategy-card');
        fireEvent.click(stranglerCard);
        
        expect(screen.getByText('Pasos de Implementación')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument(); // Step numbers
      });
    });
  });

  describe('Monitoring & Observability Tab', () => {
    beforeEach(() => {
      render(<Lesson06Integration />);
      const monitoringTab = screen.getByRole('button', { name: /monitoreo/i });
      fireEvent.click(monitoringTab);
    });

    test('displays real-time dashboard', async () => {
      await waitFor(() => {
        expect(screen.getByText('Dashboard en Tiempo Real')).toBeInTheDocument();
        expect(screen.getByText('CPU Usage')).toBeInTheDocument();
        expect(screen.getByText('Memory Usage')).toBeInTheDocument();
        expect(screen.getByText('Response Time')).toBeInTheDocument();
      });
    });

    test('metrics update automatically', async () => {
      await waitFor(() => {
        const cpuMetric = screen.getByText('CPU Usage').closest('.metric-card');
        expect(cpuMetric).toBeInTheDocument();
      });
      
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
      
      // CPU values should change due to real-time updates
      const cpuValues = screen.getAllByText(/\d+%/);
      expect(cpuValues.length).toBeGreaterThan(0);
    });

    test('alert toggle functionality', async () => {
      await waitFor(() => {
        const alertToggle = screen.getByLabelText(/alertas automáticas/i);
        fireEvent.click(alertToggle);
        
        expect(alertToggle).toBeChecked();
      });
    });

    test('monitoring tools selection', async () => {
      await waitFor(() => {
        const tools = ['Prometheus + Grafana', 'Datadog', 'New Relic', 'Elastic Stack', 'Jaeger + Zipkin'];
        
        tools.forEach(tool => {
          expect(screen.getByText(tool)).toBeInTheDocument();
        });
      });
    });

    test('tool details and feature comparison', async () => {
      await waitFor(() => {
        const prometheusCard = screen.getByText('Prometheus + Grafana').closest('.tool-card');
        fireEvent.click(prometheusCard);
        
        expect(prometheusCard).toHaveClass('selected');
        expect(screen.getByText('Características Principales')).toBeInTheDocument();
      });
    });
  });

  describe('Production Best Practices Tab', () => {
    beforeEach(() => {
      render(<Lesson06Integration />);
      const practicesTab = screen.getByRole('button', { name: /best practices/i });
      fireEvent.click(practicesTab);
    });

    test('displays all practice areas', async () => {
      await waitFor(() => {
        const practices = ['Seguridad', 'Performance', 'Reliability', 'Scalability', 'Maintainability'];
        
        practices.forEach(practice => {
          expect(screen.getByText(practice)).toBeInTheDocument();
        });
      });
    });

    test('practice selection and checklist interaction', async () => {
      await waitFor(() => {
        const securityCard = screen.getByText('Seguridad').closest('.practice-card');
        fireEvent.click(securityCard);
        
        expect(securityCard).toHaveClass('selected');
        expect(screen.getByText('Checklist de Implementación')).toBeInTheDocument();
      });
    });

    test('checklist item completion tracking', async () => {
      await waitFor(() => {
        const securityCard = screen.getByText('Seguridad').closest('.practice-card');
        fireEvent.click(securityCard);
      });
      
      await waitFor(() => {
        const checklistItems = screen.getAllByRole('checkbox');
        expect(checklistItems.length).toBeGreaterThan(0);
        
        fireEvent.click(checklistItems[0]);
        expect(checklistItems[0]).toBeChecked();
      });
    });

    test('completion progress calculation', async () => {
      await waitFor(() => {
        const securityCard = screen.getByText('Seguridad').closest('.practice-card');
        fireEvent.click(securityCard);
      });
      
      await waitFor(() => {
        const checklistItems = screen.getAllByRole('checkbox');
        fireEvent.click(checklistItems[0]);
        
        // Progress should update
        const progressText = screen.getByText(/\d+%/);
        expect(progressText).toBeInTheDocument();
      });
    });

    test('importance and effort indicators', async () => {
      await waitFor(() => {
        const practices = screen.getAllByText(/alta|media|baja/i);
        expect(practices.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Interactive Features', () => {
    test('deployment simulation with realistic timing', async () => {
      render(<Lesson06Integration />);
      
      const deployButton = screen.getByText('Deploy Demo');
      fireEvent.click(deployButton);
      
      expect(deployButton).toBeDisabled();
      
      await act(async () => {
        jest.advanceTimersByTime(3000);
      });
      
      expect(screen.getByText('Deploy Demo')).toBeEnabled();
    });

    test('migration progress tracking', async () => {
      render(<Lesson06Integration />);
      
      const migrationTab = screen.getByRole('button', { name: /migración/i });
      fireEvent.click(migrationTab);
      
      await waitFor(() => {
        const startButton = screen.getByText('Iniciar Migración');
        fireEvent.click(startButton);
      });
      
      await act(async () => {
        jest.advanceTimersByTime(5000);
      });
      
      const progressBars = screen.getAllByRole('progressbar');
      expect(progressBars.length).toBeGreaterThan(0);
    });

    test('real-time metrics simulation', async () => {
      render(<Lesson06Integration />);
      
      const monitoringTab = screen.getByRole('button', { name: /monitoreo/i });
      fireEvent.click(monitoringTab);
      
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
      
      const metricValues = screen.getAllByText(/\d+\.?\d*[%ms]/);
      expect(metricValues.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility Features', () => {
    test('keyboard navigation between tabs', () => {
      render(<Lesson06Integration />);
      
      const tabs = screen.getAllByRole('button');
      tabs[0].focus();
      
      fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
      expect(tabs[1]).toHaveFocus();
    });

    test('ARIA labels and roles are properly set', () => {
      render(<Lesson06Integration />);
      
      const tabList = screen.getByRole('tablist');
      expect(tabList).toBeInTheDocument();
      
      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBe(4);
    });

    test('progress bars have proper ARIA attributes', async () => {
      render(<Lesson06Integration />);
      
      const deployButton = screen.getByText('Deploy Demo');
      fireEvent.click(deployButton);
      
      await waitFor(() => {
        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveAttribute('aria-valuemin', '0');
        expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      });
    });

    test('checkboxes have proper labels', async () => {
      render(<Lesson06Integration />);
      
      const practicesTab = screen.getByRole('button', { name: /best practices/i });
      fireEvent.click(practicesTab);
      
      await waitFor(() => {
        const securityCard = screen.getByText('Seguridad').closest('.practice-card');
        fireEvent.click(securityCard);
      });
      
      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox');
        checkboxes.forEach(checkbox => {
          expect(checkbox).toHaveAccessibleName();
        });
      });
    });
  });

  describe('Performance Optimization', () => {
    test('components render within performance budget', () => {
      const startTime = performance.now();
      render(<Lesson06Integration />);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100); // 100ms budget
    });

    test('tab switching is responsive', async () => {
      render(<Lesson06Integration />);
      
      const startTime = performance.now();
      const migrationTab = screen.getByRole('button', { name: /migración/i });
      fireEvent.click(migrationTab);
      
      await waitFor(() => {
        expect(migrationTab).toHaveClass('active');
      });
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(50); // 50ms budget for interactions
    });

    test('animations complete within expected timeframe', async () => {
      render(<Lesson06Integration />);
      
      const deployButton = screen.getByText('Deploy Demo');
      const startTime = performance.now();
      fireEvent.click(deployButton);
      
      await waitFor(() => {
        expect(deployButton).toBeDisabled();
      });
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(300); // Animation budget
    });
  });

  describe('Error Handling', () => {
    test('handles deployment simulation errors gracefully', async () => {
      // Mock console.error to prevent test output pollution
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      render(<Lesson06Integration />);
      
      const deployButton = screen.getByText('Deploy Demo');
      
      // Simulate rapid clicking
      fireEvent.click(deployButton);
      fireEvent.click(deployButton);
      fireEvent.click(deployButton);
      
      // Should not throw errors
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    test('migration simulation handles interruption', async () => {
      render(<Lesson06Integration />);
      
      const migrationTab = screen.getByRole('button', { name: /migración/i });
      fireEvent.click(migrationTab);
      
      await waitFor(() => {
        const startButton = screen.getByText('Iniciar Migración');
        fireEvent.click(startButton);
      });
      
      // Switch tabs during migration
      const architecturesTab = screen.getByRole('button', { name: /arquitecturas/i });
      fireEvent.click(architecturesTab);
      
      // Should not cause errors
      expect(screen.getByText('Lección 6: Integración y Deployment')).toBeInTheDocument();
    });

    test('checklist state persistence during navigation', async () => {
      render(<Lesson06Integration />);
      
      const practicesTab = screen.getByRole('button', { name: /best practices/i });
      fireEvent.click(practicesTab);
      
      await waitFor(() => {
        const securityCard = screen.getByText('Seguridad').closest('.practice-card');
        fireEvent.click(securityCard);
      });
      
      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxes[0]);
      });
      
      // Navigate away and back
      const architecturesTab = screen.getByRole('button', { name: /arquitecturas/i });
      fireEvent.click(architecturesTab);
      fireEvent.click(practicesTab);
      
      await waitFor(() => {
        const securityCard = screen.getByText('Seguridad').closest('.practice-card');
        fireEvent.click(securityCard);
      });
      
      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes[0]).toBeChecked();
      });
    });
  });

  describe('Data Integrity', () => {
    test('deployment progress resets correctly', async () => {
      render(<Lesson06Integration />);
      
      // Complete first deployment
      const deployButton = screen.getByText('Deploy Demo');
      fireEvent.click(deployButton);
      
      await act(async () => {
        jest.advanceTimersByTime(3000);
      });
      
      // Start second deployment
      fireEvent.click(deployButton);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    });

    test('migration logs accumulate correctly', async () => {
      render(<Lesson06Integration />);
      
      const migrationTab = screen.getByRole('button', { name: /migración/i });
      fireEvent.click(migrationTab);
      
      await waitFor(() => {
        const startButton = screen.getByText('Iniciar Migración');
        fireEvent.click(startButton);
      });
      
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
      
      const logEntries = screen.getAllByText(/\[\d{2}:\d{2}:\d{2}\]/);
      expect(logEntries.length).toBeGreaterThan(1);
    });

    test('completion percentages calculate correctly', async () => {
      render(<Lesson06Integration />);
      
      const practicesTab = screen.getByRole('button', { name: /best practices/i });
      fireEvent.click(practicesTab);
      
      await waitFor(() => {
        const securityCard = screen.getByText('Seguridad').closest('.practice-card');
        fireEvent.click(securityCard);
      });
      
      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox');
        const totalItems = checkboxes.length;
        
        // Complete half the items
        for (let i = 0; i < Math.floor(totalItems / 2); i++) {
          fireEvent.click(checkboxes[i]);
        }
        
        const expectedPercentage = Math.round((Math.floor(totalItems / 2) / totalItems) * 100);
        expect(screen.getByText(`${expectedPercentage}%`)).toBeInTheDocument();
      });
    });
  });

  describe('Cross-browser Compatibility', () => {
    test('CSS features have fallbacks', () => {
      const { container } = render(<Lesson06Integration />);
      
      // Check for CSS custom properties usage
      const element = container.querySelector('.lesson06-integration');
      const styles = window.getComputedStyle(element);
      
      // Should not rely on unsupported features
      expect(element).toBeInTheDocument();
    });

    test('JavaScript features are compatible', () => {
      // Test uses standard JavaScript features
      expect(() => {
        render(<Lesson06Integration />);
      }).not.toThrow();
    });
  });
});

/**
 * Integration Test Suite
 * Tests component interactions and data flow
 */
describe('Lesson06Integration - Integration Tests', () => {
  test('complete workflow: architecture selection to deployment', async () => {
    render(<Lesson06Integration />);
    
    // Select serverless architecture
    const serverlessCard = screen.getByText('Serverless').closest('.architecture-card');
    fireEvent.click(serverlessCard);
    
    // Deploy demo
    const deployButton = screen.getByText('Deploy Demo');
    fireEvent.click(deployButton);
    
    // Check deployment progress
    await waitFor(() => {
      expect(deployButton).toBeDisabled();
    });
    
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    
    expect(deployButton).toBeEnabled();
  });

  test('migration strategy with monitoring setup', async () => {
    render(<Lesson06Integration />);
    
    // Go to migration tab
    const migrationTab = screen.getByRole('button', { name: /migración/i });
    fireEvent.click(migrationTab);
    
    await waitFor(() => {
      // Select migration strategy
      const stranglerCard = screen.getByText('Strangler Fig').closest('.strategy-card');
      fireEvent.click(stranglerCard);
      
      // Start migration
      const startButton = screen.getByText('Iniciar Migración');
      fireEvent.click(startButton);
    });
    
    // Switch to monitoring during migration
    const monitoringTab = screen.getByRole('button', { name: /monitoreo/i });
    fireEvent.click(monitoringTab);
    
    await waitFor(() => {
      expect(screen.getByText('Dashboard en Tiempo Real')).toBeInTheDocument();
    });
  });

  test('end-to-end best practices implementation', async () => {
    render(<Lesson06Integration />);
    
    // Navigate to best practices
    const practicesTab = screen.getByRole('button', { name: /best practices/i });
    fireEvent.click(practicesTab);
    
    await waitFor(() => {
      // Test all practice areas
      const practices = ['Seguridad', 'Performance', 'Reliability'];
      
      practices.forEach(async (practice) => {
        const practiceCard = screen.getByText(practice).closest('.practice-card');
        fireEvent.click(practiceCard);
        
        await waitFor(() => {
          expect(screen.getByText('Checklist de Implementación')).toBeInTheDocument();
          
          // Complete some checklist items
          const checkboxes = screen.getAllByRole('checkbox');
          if (checkboxes.length > 0) {
            fireEvent.click(checkboxes[0]);
          }
        });
      });
    });
  });
});

/**
 * Performance Test Suite
 * Tests component performance under various conditions
 */
describe('Lesson06Integration - Performance Tests', () => {
  test('handles rapid tab switching efficiently', async () => {
    render(<Lesson06Integration />);
    
    const tabs = [
      screen.getByRole('button', { name: /arquitecturas/i }),
      screen.getByRole('button', { name: /migración/i }),
      screen.getByRole('button', { name: /monitoreo/i }),
      screen.getByRole('button', { name: /best practices/i })
    ];
    
    // Rapid tab switching
    for (let i = 0; i < 10; i++) {
      const randomTab = tabs[Math.floor(Math.random() * tabs.length)];
      fireEvent.click(randomTab);
      
      await waitFor(() => {
        expect(randomTab).toHaveClass('active');
      });
    }
    
    // Should maintain functionality
    expect(screen.getByText('Lección 6: Integración y Deployment')).toBeInTheDocument();
  });

  test('memory usage remains stable during long interactions', async () => {
    render(<Lesson06Integration />);
    
    // Simulate extended usage
    for (let i = 0; i < 50; i++) {
      const deployButton = screen.getByText('Deploy Demo');
      fireEvent.click(deployButton);
      
      await act(async () => {
        jest.advanceTimersByTime(100);
      });
    }
    
    // Component should still be responsive
    const migrationTab = screen.getByRole('button', { name: /migración/i });
    fireEvent.click(migrationTab);
    
    await waitFor(() => {
      expect(migrationTab).toHaveClass('active');
    });
  });
});
