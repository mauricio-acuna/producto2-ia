/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import Lesson01MemoryIntro from '../index';
import { MemoryComparison, RealWorldExample, ImpactMetrics } from '../components';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Lesson01MemoryIntro', () => {
  describe('Main Component', () => {
    beforeEach(() => {
      render(<Lesson01MemoryIntro />);
    });

    test('renders lesson title correctly', () => {
      expect(screen.getByRole('heading', { 
        name: /lección 1: ¿por qué necesitamos memoria\?/i,
        level: 1 
      })).toBeInTheDocument();
    });

    test('contains all main sections', () => {
      expect(screen.getByRole('heading', { 
        name: /el problema fundamental/i,
        level: 2 
      })).toBeInTheDocument();
      
      expect(screen.getByRole('heading', { 
        name: /comparación directa/i,
        level: 2 
      })).toBeInTheDocument();
      
      expect(screen.getByRole('heading', { 
        name: /ejemplo del mundo real/i,
        level: 2 
      })).toBeInTheDocument();
    });

    test('has proper semantic structure', () => {
      const main = screen.getByRole('main');
      expect(main).toHaveClass('lesson-memory-intro');
      expect(main).toHaveAttribute('aria-labelledby');
    });

    test('contains introduction paragraph', () => {
      expect(screen.getByText(/imagina que cada vez que hablas/i)).toBeInTheDocument();
    });

    test('is accessible', async () => {
      const { container } = render(<Lesson01MemoryIntro />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('MemoryComparison Component', () => {
    beforeEach(() => {
      render(<MemoryComparison />);
    });

    test('renders both comparison cards', () => {
      expect(screen.getByText('🚫 Sin Memoria')).toBeInTheDocument();
      expect(screen.getByText('✅ Con Memoria')).toBeInTheDocument();
    });

    test('shows correct without memory problems', () => {
      expect(screen.getByText(/cada conversación empieza desde cero/i)).toBeInTheDocument();
      expect(screen.getByText(/no recuerda preferencias del usuario/i)).toBeInTheDocument();
    });

    test('shows correct with memory benefits', () => {
      expect(screen.getByText(/mantiene contexto entre conversaciones/i)).toBeInTheDocument();
      expect(screen.getByText(/experiencia personalizada y coherente/i)).toBeInTheDocument();
    });

    test('displays example conversations', () => {
      // Without memory conversation
      expect(screen.getByText(/mi nombre es ana y trabajo en marketing/i)).toBeInTheDocument();
      expect(screen.getByText(/¿cuál es tu trabajo\? no tengo esa información/i)).toBeInTheDocument();
      
      // With memory conversation  
      expect(screen.getByText(/¡hola ana! el marketing es fascinante/i)).toBeInTheDocument();
    });

    test('has proper CSS classes', () => {
      const container = screen.getByText('🚫 Sin Memoria').closest('.comparison-card');
      expect(container).toHaveClass('without-memory');
      
      const memoryContainer = screen.getByText('✅ Con Memoria').closest('.comparison-card');
      expect(memoryContainer).toHaveClass('with-memory');
    });

    test('is accessible', async () => {
      const { container } = render(<MemoryComparison />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('RealWorldExample Component', () => {
    beforeEach(() => {
      render(<RealWorldExample />);
    });

    test('renders all three scenarios', () => {
      expect(screen.getByText(/📞 primera llamada \(lunes\)/i)).toBeInTheDocument();
      expect(screen.getByText(/📧 email de seguimiento \(martes\)/i)).toBeInTheDocument();
      expect(screen.getByText(/💬 chat en línea \(miércoles\)/i)).toBeInTheDocument();
    });

    test('shows customer name consistency', () => {
      const mariaReferences = screen.getAllByText(/maría/i);
      expect(mariaReferences.length).toBeGreaterThan(3); // Should appear multiple times
    });

    test('shows order number consistency', () => {
      const orderReferences = screen.getAllByText(/#12345/);
      expect(orderReferences.length).toBeGreaterThan(2); // Should appear in multiple scenarios
    });

    test('displays memory notes for each scenario', () => {
      expect(screen.getByText(/💾/)).toBeInTheDocument();
      expect(screen.getByText(/nombre cliente, pedido #12345/i)).toBeInTheDocument();
      expect(screen.getByText(/historial completo, preferencias/i)).toBeInTheDocument();
    });

    test('has proper conversation flow structure', () => {
      const conversationFlows = screen.getAllByText(/maría/i)[0].closest('.conversation-flow');
      expect(conversationFlows).toBeInTheDocument();
    });

    test('is accessible', async () => {
      const { container } = render(<RealWorldExample />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ImpactMetrics Component', () => {
    beforeEach(() => {
      render(<ImpactMetrics />);
    });

    test('renders without memory section', () => {
      expect(screen.getByText(/❌ sin memoria \(experiencia fragmentada\)/i)).toBeInTheDocument();
      expect(screen.getByText(/8.5 minutos promedio/i)).toBeInTheDocument();
      expect(screen.getByText(/satisfacción del cliente: 3.2\/5/i)).toBeInTheDocument();
    });

    test('renders with memory section', () => {
      expect(screen.getByText(/✅ con memoria \(experiencia continua\)/i)).toBeInTheDocument();
      expect(screen.getByText(/3.0 minutos promedio \(-65%\)/i)).toBeInTheDocument();
      expect(screen.getByText(/satisfacción del cliente: 4.6\/5 \(\+44%\)/i)).toBeInTheDocument();
    });

    test('displays quantified impact metrics', () => {
      expect(screen.getByText(/📊 impacto cuantificado/i)).toBeInTheDocument();
      expect(screen.getByText('65%')).toBeInTheDocument();
      expect(screen.getByText('44%')).toBeInTheDocument();
      expect(screen.getByText('66%')).toBeInTheDocument();
      expect(screen.getByText('85%')).toBeInTheDocument();
    });

    test('shows metric labels', () => {
      expect(screen.getByText(/reducción en tiempo de resolución/i)).toBeInTheDocument();
      expect(screen.getByText(/mejora en satisfacción/i)).toBeInTheDocument();
      expect(screen.getByText(/menos escalamientos/i)).toBeInTheDocument();
      expect(screen.getByText(/clientes prefieren agentes con memoria/i)).toBeInTheDocument();
    });

    test('has proper metrics grid structure', () => {
      const metricsGrid = screen.getByText('65%').closest('.metrics-grid');
      expect(metricsGrid).toBeInTheDocument();
      
      const metricCards = screen.getAllByText(/\d+%/);
      expect(metricCards.length).toBe(4); // Should have 4 metric cards
    });

    test('is accessible', async () => {
      const { container } = render(<ImpactMetrics />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Integration Tests', () => {
    test('all components work together in main lesson', () => {
      render(<Lesson01MemoryIntro />);
      
      // Check that all sub-components are rendered
      expect(screen.getByText('🚫 Sin Memoria')).toBeInTheDocument();
      expect(screen.getByText(/📞 primera llamada/i)).toBeInTheDocument();
      expect(screen.getByText(/📊 impacto cuantificado/i)).toBeInTheDocument();
    });

    test('maintains proper heading hierarchy', () => {
      render(<Lesson01MemoryIntro />);
      
      const headings = screen.getAllByRole('heading');
      const h1 = headings.filter(h => h.tagName === 'H1');
      const h2 = headings.filter(h => h.tagName === 'H2');
      
      expect(h1).toHaveLength(1); // Only one main title
      expect(h2.length).toBeGreaterThan(2); // Multiple section headings
    });

    test('keyboard navigation works properly', () => {
      render(<Lesson01MemoryIntro />);
      
      const focusableElements = screen.getAllByRole('heading');
      focusableElements.forEach(element => {
        expect(element).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('Performance Tests', () => {
    test('renders quickly with large content', () => {
      const startTime = performance.now();
      render(<Lesson01MemoryIntro />);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100); // Should render in under 100ms
    });

    test('components are memoized correctly', () => {
      const { rerender } = render(<MemoryComparison />);
      
      const initialText = screen.getByText('🚫 Sin Memoria');
      rerender(<MemoryComparison />);
      const afterRerender = screen.getByText('🚫 Sin Memoria');
      
      expect(initialText).toBe(afterRerender); // Should be the same DOM node
    });
  });
});
