/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import Lesson03Implementation from '../index';
import { 
  MemoryArchitecture, 
  CodeImplementation, 
  LiveDemo, 
  PerformanceMetrics 
} from '../components';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Lesson03Implementation', () => {
  describe('Main Component', () => {
    beforeEach(() => {
      render(<Lesson03Implementation />);
    });

    test('renders lesson title correctly', () => {
      expect(screen.getByRole('heading', { 
        name: /lección 3: implementación técnica de memoria/i,
        level: 1 
      })).toBeInTheDocument();
    });

    test('contains navigation tabs', () => {
      expect(screen.getByRole('tab', { name: /arquitectura de memoria/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /implementación técnica/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /demo interactivo/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /métricas de rendimiento/i })).toBeInTheDocument();
    });

    test('switches between sections on tab click', async () => {
      const user = userEvent.setup();
      const implementationTab = screen.getByRole('tab', { name: /implementación técnica/i });
      
      await user.click(implementationTab);
      
      expect(implementationTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tabpanel', { name: /implementación técnica/i })).not.toHaveAttribute('hidden');
    });

    test('has proper semantic structure', () => {
      const main = screen.getByRole('main');
      expect(main).toHaveClass('lesson-implementation');
      expect(main).toHaveAttribute('aria-labelledby', 'lesson-title');
    });

    test('contains key concepts section', () => {
      expect(screen.getByText(/🎯 conceptos clave de implementación/i)).toBeInTheDocument();
      expect(screen.getByText(/🔧 estructuras de datos/i)).toBeInTheDocument();
      expect(screen.getByText(/⚡ algoritmos de optimización/i)).toBeInTheDocument();
    });

    test('contains implementation checklist', () => {
      expect(screen.getByText(/✅ checklist de implementación/i)).toBeInTheDocument();
      expect(screen.getByText(/🏁 fase inicial/i)).toBeInTheDocument();
      expect(screen.getByText(/🔧 desarrollo/i)).toBeInTheDocument();
    });

    test('checklist items are interactive', async () => {
      const user = userEvent.setup();
      const checkbox = screen.getAllByRole('checkbox')[0];
      
      expect(checkbox).not.toBeChecked();
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    test('has proper ARIA attributes for tabs', () => {
      const tabs = screen.getAllByRole('tab');
      const panels = screen.getAllByRole('tabpanel');
      
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(panels[0]).not.toHaveAttribute('hidden');
      
      tabs.forEach((tab, index) => {
        expect(tab).toHaveAttribute('aria-controls', `section-${tab.textContent.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '')}`);
      });
    });

    test('is accessible', async () => {
      const { container } = render(<Lesson03Implementation />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('MemoryArchitecture Component', () => {
    beforeEach(() => {
      render(<MemoryArchitecture />);
    });

    test('renders architecture diagram', () => {
      expect(screen.getByRole('img', { name: /diagrama de arquitectura/i })).toBeInTheDocument();
    });

    test('shows component selection prompt initially', () => {
      expect(screen.getByText(/👆 haz clic en cualquier componente/i)).toBeInTheDocument();
    });

    test('displays flow steps', () => {
      expect(screen.getByText(/🔄 flujo de información/i)).toBeInTheDocument();
      expect(screen.getByText(/entrada de datos/i)).toBeInTheDocument();
      expect(screen.getByText(/procesamiento/i)).toBeInTheDocument();
      expect(screen.getByText(/almacenamiento e indexación/i)).toBeInTheDocument();
    });

    test('flow steps are properly numbered', () => {
      const stepNumbers = screen.getAllByText(/^[1-5]$/);
      expect(stepNumbers).toHaveLength(5);
    });

    test('shows architecture components details section', () => {
      expect(screen.getByText(/🔍 detalles de componentes/i)).toBeInTheDocument();
    });

    test('is accessible', async () => {
      const { container } = render(<MemoryArchitecture />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('CodeImplementation Component', () => {
    beforeEach(() => {
      render(<CodeImplementation />);
    });

    test('renders code navigation tabs', () => {
      expect(screen.getByText(/📚 ejemplos de implementación/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /clase conversationmessage/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /gestor de memoria principal/i })).toBeInTheDocument();
    });

    test('shows initial code example', () => {
      expect(screen.getByText(/clase conversationmessage/i)).toBeInTheDocument();
      expect(screen.getByText(/estructura básica para representar mensajes/i)).toBeInTheDocument();
    });

    test('displays code block with syntax highlighting info', () => {
      expect(screen.getByText('python')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /📋 copiar/i })).toBeInTheDocument();
    });

    test('switches between code examples', async () => {
      const user = userEvent.setup();
      const memoryManagerTab = screen.getByRole('button', { name: /gestor de memoria principal/i });
      
      await user.click(memoryManagerTab);
      
      expect(screen.getByText(/gestor de memoria principal/i)).toBeInTheDocument();
      expect(screen.getByText(/sistema de memoria de corto plazo optimizado/i)).toBeInTheDocument();
    });

    test('shows code explanations', () => {
      expect(screen.getByText(/💡 puntos clave:/i)).toBeInTheDocument();
      const explanations = screen.getAllByText(/la clase conversationmessage/i);
      expect(explanations.length).toBeGreaterThan(0);
    });

    test('copy button is functional', () => {
      const copyButton = screen.getByRole('button', { name: /📋 copiar/i });
      expect(copyButton).toBeInTheDocument();
      expect(copyButton).not.toBeDisabled();
    });

    test('is accessible', async () => {
      const { container } = render(<CodeImplementation />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('LiveDemo Component', () => {
    beforeEach(() => {
      render(<LiveDemo />);
    });

    test('renders demo sections', () => {
      expect(screen.getByText(/💬 conversación activa/i)).toBeInTheDocument();
      expect(screen.getByText(/🔍 búsqueda en memoria/i)).toBeInTheDocument();
      expect(screen.getByText(/📊 estadísticas de memoria/i)).toBeInTheDocument();
    });

    test('shows initial conversation messages', () => {
      expect(screen.getByText(/hola, me llamo maría y soy desarrolladora/i)).toBeInTheDocument();
      expect(screen.getByText(/hola maría, encantado de conocerte/i)).toBeInTheDocument();
    });

    test('displays initial memory statistics', () => {
      expect(screen.getByText('2')).toBeInTheDocument(); // Total messages
      expect(screen.getByText(/mensajes totales/i)).toBeInTheDocument();
      expect(screen.getByText(/entidades activas/i)).toBeInTheDocument();
    });

    test('adds new message to conversation', async () => {
      const user = userEvent.setup();
      const messageInput = screen.getByPlaceholderText(/escribe un mensaje/i);
      const sendButton = screen.getByRole('button', { name: /enviar/i });
      
      await user.type(messageInput, 'Trabajo principalmente con React y Node.js');
      await user.click(sendButton);
      
      expect(screen.getByText(/trabajo principalmente con react y node.js/i)).toBeInTheDocument();
    });

    test('updates statistics after adding message', async () => {
      const user = userEvent.setup();
      const messageInput = screen.getByPlaceholderText(/escribe un mensaje/i);
      const sendButton = screen.getByRole('button', { name: /enviar/i });
      
      await user.type(messageInput, 'Trabajo con Python y Django');
      await user.click(sendButton);
      
      // Should update total messages count
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    test('performs memory search', async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText(/buscar en la memoria/i);
      const searchButton = screen.getByRole('button', { name: /buscar/i });
      
      await user.type(searchInput, 'maría');
      await user.click(searchButton);
      
      expect(screen.getByText(/relevancia:/i)).toBeInTheDocument();
    });

    test('shows entities and topics', () => {
      expect(screen.getByText(/🏷️ entidades reconocidas/i)).toBeInTheDocument();
      expect(screen.getByText(/📋 temas activos/i)).toBeInTheDocument();
      expect(screen.getByText('María')).toBeInTheDocument();
      expect(screen.getByText('desarrolladora')).toBeInTheDocument();
    });

    test('handles enter key for message input', async () => {
      const user = userEvent.setup();
      const messageInput = screen.getByPlaceholderText(/escribe un mensaje/i);
      
      await user.type(messageInput, 'Test message{Enter}');
      
      expect(screen.getByText(/test message/i)).toBeInTheDocument();
    });

    test('handles enter key for search input', async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText(/buscar en la memoria/i);
      
      await user.type(searchInput, 'desarrolladora{Enter}');
      
      // Should perform search and show results
      expect(screen.getByText(/relevancia:/i)).toBeInTheDocument();
    });

    test('disables send button for empty message', () => {
      const sendButton = screen.getByRole('button', { name: /enviar/i });
      expect(sendButton).toBeDisabled();
    });

    test('is accessible', async () => {
      const { container } = render(<LiveDemo />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('PerformanceMetrics Component', () => {
    beforeEach(() => {
      render(<PerformanceMetrics />);
    });

    test('renders metrics dashboard', () => {
      expect(screen.getByText(/📊 métricas en tiempo real/i)).toBeInTheDocument();
      expect(screen.getByText(/tiempo de respuesta/i)).toBeInTheDocument();
      expect(screen.getByText(/throughput/i)).toBeInTheDocument();
    });

    test('shows metric values with units', () => {
      expect(screen.getByText(/ms$/)).toBeInTheDocument(); // Response time
      expect(screen.getByText(/ops\/seg$/)).toBeInTheDocument(); // Throughput
      expect(screen.getByText(/%$/)).toBeInTheDocument(); // Percentages
    });

    test('displays optimization recommendations', () => {
      expect(screen.getByText(/🚀 recomendaciones de optimización/i)).toBeInTheDocument();
      expect(screen.getByText(/alta prioridad/i)).toBeInTheDocument();
      expect(screen.getByText(/media prioridad/i)).toBeInTheDocument();
    });

    test('shows benchmark comparison table', () => {
      expect(screen.getByText(/⚖️ comparación con benchmarks/i)).toBeInTheDocument();
      expect(screen.getByText(/tu sistema/i)).toBeInTheDocument();
      expect(screen.getByText(/promedio industria/i)).toBeInTheDocument();
    });

    test('recommendation actions are interactive', () => {
      const implementButton = screen.getByRole('button', { name: /implementar/i });
      const planButton = screen.getByRole('button', { name: /planificar/i });
      
      expect(implementButton).toBeInTheDocument();
      expect(planButton).toBeInTheDocument();
      expect(implementButton).not.toBeDisabled();
    });

    test('metrics have proper status indicators', () => {
      const statusIndicators = screen.getAllByRole('generic').filter(
        el => el.className.includes('status-indicator')
      );
      expect(statusIndicators.length).toBeGreaterThan(0);
    });

    test('shows metric descriptions', () => {
      expect(screen.getByText(/tiempo promedio para responder/i)).toBeInTheDocument();
      expect(screen.getByText(/operaciones procesadas por segundo/i)).toBeInTheDocument();
    });

    test('benchmark table has proper structure', () => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      
      const headers = screen.getAllByRole('columnheader');
      expect(headers.length).toBeGreaterThan(3);
    });

    test('is accessible', async () => {
      const { container } = render(<PerformanceMetrics />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Integration Tests', () => {
    test('all components work together in main lesson', () => {
      render(<Lesson03Implementation />);
      
      // Architecture components should be present initially
      expect(screen.getByText(/🔄 flujo de información/i)).toBeInTheDocument();
    });

    test('tab navigation works correctly between all sections', async () => {
      const user = userEvent.setup();
      render(<Lesson03Implementation />);
      
      // Test each tab
      const tabs = ['implementation', 'demo', 'performance'];
      
      for (const tabName of tabs) {
        const tab = screen.getByRole('tab', { name: new RegExp(tabName, 'i') });
        await user.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      }
    });

    test('maintains proper heading hierarchy', () => {
      render(<Lesson03Implementation />);
      
      const headings = screen.getAllByRole('heading');
      const h1 = headings.filter(h => h.tagName === 'H1');
      const h2 = headings.filter(h => h.tagName === 'H2');
      
      expect(h1).toHaveLength(1); // Only one main title
      expect(h2.length).toBeGreaterThan(3); // Multiple section headings
    });

    test('keyboard navigation works properly', async () => {
      const user = userEvent.setup();
      render(<Lesson03Implementation />);
      
      const tabs = screen.getAllByRole('tab');
      
      // Should be able to tab through navigation
      tabs[0].focus();
      await user.keyboard('{ArrowRight}');
      expect(tabs[1]).toHaveFocus();
    });

    test('section content is properly hidden/shown', async () => {
      const user = userEvent.setup();
      render(<Lesson03Implementation />);
      
      const implementationTab = screen.getByRole('tab', { name: /implementación técnica/i });
      const demoTab = screen.getByRole('tab', { name: /demo interactivo/i });
      
      // Initially architecture should be visible
      expect(screen.getByRole('tabpanel', { name: /arquitectura/i })).not.toHaveAttribute('hidden');
      
      // Switch to implementation
      await user.click(implementationTab);
      expect(screen.getByRole('tabpanel', { name: /implementación/i })).not.toHaveAttribute('hidden');
      
      // Switch to demo
      await user.click(demoTab);
      expect(screen.getByRole('tabpanel', { name: /demo/i })).not.toHaveAttribute('hidden');
    });
  });

  describe('Performance Tests', () => {
    test('renders quickly with complex content', () => {
      const startTime = performance.now();
      render(<Lesson03Implementation />);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(200); // Should render in under 200ms
    });

    test('tab switching is efficient', async () => {
      const user = userEvent.setup();
      render(<Lesson03Implementation />);
      
      const implementationTab = screen.getByRole('tab', { name: /implementación técnica/i });
      
      const startTime = performance.now();
      await user.click(implementationTab);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(50); // Tab switching should be fast
    });

    test('demo interactions are responsive', async () => {
      const user = userEvent.setup();
      render(<LiveDemo />);
      
      const messageInput = screen.getByPlaceholderText(/escribe un mensaje/i);
      const sendButton = screen.getByRole('button', { name: /enviar/i });
      
      const startTime = performance.now();
      await user.type(messageInput, 'Test message');
      await user.click(sendButton);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100); // Message addition should be fast
    });
  });

  describe('Error Handling', () => {
    test('handles empty search queries gracefully', async () => {
      const user = userEvent.setup();
      render(<LiveDemo />);
      
      const searchButton = screen.getByRole('button', { name: /buscar/i });
      expect(searchButton).toBeDisabled(); // Should be disabled for empty query
    });

    test('handles empty message input gracefully', () => {
      render(<LiveDemo />);
      
      const sendButton = screen.getByRole('button', { name: /enviar/i });
      expect(sendButton).toBeDisabled(); // Should be disabled for empty message
    });

    test('handles missing data gracefully', () => {
      // Test with minimal data
      render(<PerformanceMetrics />);
      
      // Should still render without errors
      expect(screen.getByText(/📊 métricas en tiempo real/i)).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    test('adapts to mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      render(<Lesson03Implementation />);
      
      // Should still render properly on mobile
      expect(screen.getByRole('heading', { 
        name: /lección 3: implementación técnica/i 
      })).toBeInTheDocument();
    });
  });
});
