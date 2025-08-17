/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import Lesson02MemoryTypes from '../index';
import { MemoryTypesGrid, ConversationFlow, ConversationBuffer } from '../components';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Lesson02MemoryTypes', () => {
  describe('Main Component', () => {
    beforeEach(() => {
      render(<Lesson02MemoryTypes />);
    });

    test('renders lesson title correctly', () => {
      expect(screen.getByRole('heading', { 
        name: /lección 2: tipos de memoria en agentes ia/i,
        level: 1 
      })).toBeInTheDocument();
    });

    test('contains all main sections', () => {
      expect(screen.getByRole('heading', { 
        name: /🧠 tipos de memoria/i,
        level: 2 
      })).toBeInTheDocument();
      
      expect(screen.getByRole('heading', { 
        name: /⏰ enfoque en memoria de corto plazo/i,
        level: 2 
      })).toBeInTheDocument();
      
      expect(screen.getByRole('heading', { 
        name: /💬 memoria en acción/i,
        level: 2 
      })).toBeInTheDocument();
    });

    test('has proper semantic structure', () => {
      const main = screen.getByRole('main');
      expect(main).toHaveClass('lesson-memory-types');
      expect(main).toHaveAttribute('aria-labelledby', 'lesson-title');
    });

    test('contains introduction paragraph', () => {
      expect(screen.getByText(/los sistemas de memoria para agentes se inspiran/i)).toBeInTheDocument();
    });

    test('displays key concepts section', () => {
      expect(screen.getByText(/capacidad limitada/i)).toBeInTheDocument();
      expect(screen.getByText(/duración temporal/i)).toBeInTheDocument();
      expect(screen.getByText(/acceso rápido/i)).toBeInTheDocument();
    });

    test('is accessible', async () => {
      const { container } = render(<Lesson02MemoryTypes />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('MemoryTypesGrid Component', () => {
    beforeEach(() => {
      render(<MemoryTypesGrid />);
    });

    test('renders all memory type cards', () => {
      expect(screen.getByText('🔄 Memoria de Trabajo')).toBeInTheDocument();
      expect(screen.getByText('⏰ Memoria de Corto Plazo')).toBeInTheDocument();
      expect(screen.getByText('💾 Memoria de Largo Plazo')).toBeInTheDocument();
      expect(screen.getByText('📖 Memoria Episódica')).toBeInTheDocument();
      expect(screen.getByText('🧩 Memoria Semántica')).toBeInTheDocument();
    });

    test('shows card descriptions', () => {
      expect(screen.getByText(/información activa para la tarea actual/i)).toBeInTheDocument();
      expect(screen.getByText(/contexto de la sesión actual/i)).toBeInTheDocument();
      expect(screen.getByText(/información persistente entre sesiones/i)).toBeInTheDocument();
    });

    test('expands card details on click', async () => {
      const user = userEvent.setup();
      const workingMemoryCard = screen.getByText('🔄 Memoria de Trabajo').closest('.memory-type-card');
      
      // Initially details should not be visible
      expect(screen.queryByText(/durante un cálculo matemático/i)).not.toBeInTheDocument();
      
      // Click to expand
      await user.click(workingMemoryCard);
      
      // Details should now be visible
      expect(screen.getByText(/durante un cálculo matemático/i)).toBeInTheDocument();
      expect(screen.getByText(/segundos a minutos/i)).toBeInTheDocument();
    });

    test('collapses card details on second click', async () => {
      const user = userEvent.setup();
      const workingMemoryCard = screen.getByText('🔄 Memoria de Trabajo').closest('.memory-type-card');
      
      // Expand first
      await user.click(workingMemoryCard);
      expect(screen.getByText(/durante un cálculo matemático/i)).toBeInTheDocument();
      
      // Collapse on second click
      await user.click(workingMemoryCard);
      expect(screen.queryByText(/durante un cálculo matemático/i)).not.toBeInTheDocument();
    });

    test('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      const workingMemoryCard = screen.getByText('🔄 Memoria de Trabajo').closest('.memory-type-card');
      
      // Focus and activate with Enter
      workingMemoryCard.focus();
      await user.keyboard('{Enter}');
      
      expect(screen.getByText(/durante un cálculo matemático/i)).toBeInTheDocument();
      
      // Deactivate with Space
      await user.keyboard(' ');
      expect(screen.queryByText(/durante un cálculo matemático/i)).not.toBeInTheDocument();
    });

    test('shows correct aria-expanded state', async () => {
      const user = userEvent.setup();
      const workingMemoryCard = screen.getByText('🔄 Memoria de Trabajo').closest('.memory-type-card');
      
      expect(workingMemoryCard).toHaveAttribute('aria-expanded', 'false');
      
      await user.click(workingMemoryCard);
      expect(workingMemoryCard).toHaveAttribute('aria-expanded', 'true');
    });

    test('is accessible', async () => {
      const { container } = render(<MemoryTypesGrid />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ConversationFlow Component', () => {
    beforeEach(() => {
      render(<ConversationFlow />);
    });

    test('renders conversation controls', () => {
      expect(screen.getByRole('button', { name: /anterior/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /reiniciar/i })).toBeInTheDocument();
      expect(screen.getByText(/paso 1 de 5/i)).toBeInTheDocument();
    });

    test('displays initial conversation message', () => {
      expect(screen.getByText(/hola, me llamo carlos y soy desarrollador/i)).toBeInTheDocument();
    });

    test('shows memory state for current step', () => {
      expect(screen.getByText(/🧠 estado de la memoria de corto plazo/i)).toBeInTheDocument();
      expect(screen.getByText(/📝 buffer de conversación/i)).toBeInTheDocument();
      expect(screen.getByText(/🏷️ entidades reconocidas/i)).toBeInTheDocument();
    });

    test('navigates to next step', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /siguiente/i });
      
      await user.click(nextButton);
      
      expect(screen.getByText(/paso 2 de 5/i)).toBeInTheDocument();
      expect(screen.getByText(/¡hola carlos! encantado de conocerte/i)).toBeInTheDocument();
    });

    test('navigates to previous step', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /siguiente/i });
      const prevButton = screen.getByRole('button', { name: /anterior/i });
      
      // Go forward first
      await user.click(nextButton);
      expect(screen.getByText(/paso 2 de 5/i)).toBeInTheDocument();
      
      // Then go back
      await user.click(prevButton);
      expect(screen.getByText(/paso 1 de 5/i)).toBeInTheDocument();
    });

    test('resets conversation', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /siguiente/i });
      const resetButton = screen.getByRole('button', { name: /reiniciar/i });
      
      // Go to step 3
      await user.click(nextButton);
      await user.click(nextButton);
      expect(screen.getByText(/paso 3 de 5/i)).toBeInTheDocument();
      
      // Reset
      await user.click(resetButton);
      expect(screen.getByText(/paso 1 de 5/i)).toBeInTheDocument();
    });

    test('disables navigation buttons at boundaries', () => {
      const prevButton = screen.getByRole('button', { name: /anterior/i });
      expect(prevButton).toBeDisabled();
    });

    test('updates memory state with conversation progress', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /siguiente/i });
      
      // Initially shows Carlos and Python
      expect(screen.getByText('Carlos')).toBeInTheDocument();
      expect(screen.getByText('Python')).toBeInTheDocument();
      
      // After next step, should show more entities
      await user.click(nextButton);
      await user.click(nextButton); // Go to step 3
      
      expect(screen.getByText('APIs REST')).toBeInTheDocument();
      expect(screen.getByText('machine learning')).toBeInTheDocument();
    });

    test('is accessible', async () => {
      const { container } = render(<ConversationFlow />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ConversationBuffer Component', () => {
    beforeEach(() => {
      render(<ConversationBuffer />);
    });

    test('renders buffer controls and visualization', () => {
      expect(screen.getByText(/tamaño del buffer: 5/i)).toBeInTheDocument();
      expect(screen.getByText(/🗂️ buffer circular de conversación/i)).toBeInTheDocument();
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    test('shows initial messages in buffer', () => {
      expect(screen.getByText(/hola, me llamo ana/i)).toBeInTheDocument();
      expect(screen.getByText(/tengo una pregunta sobre python/i)).toBeInTheDocument();
    });

    test('displays buffer status', () => {
      expect(screen.getByText(/usado: 4\/5/i)).toBeInTheDocument();
      expect(screen.getByText(/✅ espacio disponible/i)).toBeInTheDocument();
    });

    test('adjusts buffer size with slider', async () => {
      const user = userEvent.setup();
      const slider = screen.getByRole('slider');
      
      await user.clear(slider);
      await user.type(slider, '3');
      
      expect(screen.getByText(/tamaño del buffer: 3/i)).toBeInTheDocument();
      expect(screen.getByText(/usado: 3\/3/i)).toBeInTheDocument();
      expect(screen.getByText(/⚠️ buffer lleno/i)).toBeInTheDocument();
    });

    test('adds new message to buffer', async () => {
      const user = userEvent.setup();
      const textarea = screen.getByPlaceholderText(/escribe un mensaje/i);
      const addButton = screen.getByRole('button', { name: /agregar mensaje/i });
      
      await user.type(textarea, 'Nuevo mensaje de prueba');
      await user.click(addButton);
      
      expect(screen.getByText(/nuevo mensaje de prueba/i)).toBeInTheDocument();
      expect(screen.getByText(/usado: 5\/5/i)).toBeInTheDocument();
    });

    test('implements circular buffer behavior', async () => {
      const user = userEvent.setup();
      const textarea = screen.getByPlaceholderText(/escribe un mensaje/i);
      const addButton = screen.getByRole('button', { name: /agregar mensaje/i });
      
      // Fill buffer to capacity
      await user.type(textarea, 'Mensaje 5');
      await user.click(addButton);
      
      await user.clear(textarea);
      await user.type(textarea, 'Mensaje 6 (should replace oldest)');
      await user.click(addButton);
      
      // Oldest message should be gone, newest should be present
      expect(screen.queryByText(/hola, me llamo ana/i)).not.toBeInTheDocument();
      expect(screen.getByText(/mensaje 6 \(should replace oldest\)/i)).toBeInTheDocument();
    });

    test('clears buffer when clear button is clicked', async () => {
      const user = userEvent.setup();
      const clearButton = screen.getByRole('button', { name: /limpiar buffer/i });
      
      await user.click(clearButton);
      
      expect(screen.getByText(/usado: 0\/5/i)).toBeInTheDocument();
      expect(screen.getAllByText(/vacío/i)).toHaveLength(5);
    });

    test('handles enter key to add message', async () => {
      const user = userEvent.setup();
      const textarea = screen.getByPlaceholderText(/escribe un mensaje/i);
      
      await user.type(textarea, 'Mensaje con Enter{Enter}');
      
      expect(screen.getByText(/mensaje con enter/i)).toBeInTheDocument();
    });

    test('disables add button for empty messages', () => {
      const addButton = screen.getByRole('button', { name: /agregar mensaje/i });
      expect(addButton).toBeDisabled();
    });

    test('shows buffer explanation', () => {
      expect(screen.getByText(/💡 cómo funciona/i)).toBeInTheDocument();
      expect(screen.getByText(/capacidad fija/i)).toBeInTheDocument();
      expect(screen.getByText(/fifo \(first in, first out\)/i)).toBeInTheDocument();
    });

    test('is accessible', async () => {
      const { container } = render(<ConversationBuffer />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Integration Tests', () => {
    test('all components work together in main lesson', () => {
      render(<Lesson02MemoryTypes />);
      
      // Check that all sub-components are rendered
      expect(screen.getByText('🔄 Memoria de Trabajo')).toBeInTheDocument();
      expect(screen.getByText(/paso 1 de 5/i)).toBeInTheDocument();
      expect(screen.getByText(/tamaño del buffer: 5/i)).toBeInTheDocument();
    });

    test('maintains proper heading hierarchy', () => {
      render(<Lesson02MemoryTypes />);
      
      const headings = screen.getAllByRole('heading');
      const h1 = headings.filter(h => h.tagName === 'H1');
      const h2 = headings.filter(h => h.tagName === 'H2');
      
      expect(h1).toHaveLength(1); // Only one main title
      expect(h2.length).toBeGreaterThan(3); // Multiple section headings
    });

    test('benefits and challenges sections are present', () => {
      render(<Lesson02MemoryTypes />);
      
      expect(screen.getByText(/⚖️ beneficios y desafíos/i)).toBeInTheDocument();
      expect(screen.getByText(/✅ beneficios/i)).toBeInTheDocument();
      expect(screen.getByText(/⚠️ desafíos/i)).toBeInTheDocument();
    });

    test('best practices section is present', () => {
      render(<Lesson02MemoryTypes />);
      
      expect(screen.getByText(/🎯 mejores prácticas/i)).toBeInTheDocument();
      expect(screen.getByText(/🔄 rotación inteligente/i)).toBeInTheDocument();
      expect(screen.getByText(/📊 puntuación de relevancia/i)).toBeInTheDocument();
    });

    test('lesson navigation is present', () => {
      render(<Lesson02MemoryTypes />);
      
      expect(screen.getByRole('button', { name: /volver a la lección anterior/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /continuar a la siguiente lección/i })).toBeInTheDocument();
    });
  });

  describe('Performance Tests', () => {
    test('renders quickly with complex content', () => {
      const startTime = performance.now();
      render(<Lesson02MemoryTypes />);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(150); // Should render in under 150ms
    });

    test('conversation flow updates efficiently', async () => {
      const user = userEvent.setup();
      render(<ConversationFlow />);
      
      const nextButton = screen.getByRole('button', { name: /siguiente/i });
      
      const startTime = performance.now();
      await user.click(nextButton);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(50); // State update should be fast
    });

    test('buffer operations are efficient', async () => {
      const user = userEvent.setup();
      render(<ConversationBuffer />);
      
      const textarea = screen.getByPlaceholderText(/escribe un mensaje/i);
      const addButton = screen.getByRole('button', { name: /agregar mensaje/i });
      
      const startTime = performance.now();
      await user.type(textarea, 'Test message');
      await user.click(addButton);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100); // Buffer update should be fast
    });
  });

  describe('Error Handling', () => {
    test('handles invalid buffer sizes gracefully', async () => {
      const user = userEvent.setup();
      render(<ConversationBuffer />);
      
      const slider = screen.getByRole('slider');
      
      // Try to set invalid values (should be clamped)
      fireEvent.change(slider, { target: { value: '15' } });
      expect(screen.getByText(/tamaño del buffer: 10/i)).toBeInTheDocument();
      
      fireEvent.change(slider, { target: { value: '0' } });
      expect(screen.getByText(/tamaño del buffer: 2/i)).toBeInTheDocument();
    });

    test('handles empty state gracefully', async () => {
      const user = userEvent.setup();
      render(<ConversationBuffer />);
      
      const clearButton = screen.getByRole('button', { name: /limpiar buffer/i });
      await user.click(clearButton);
      
      // Should show empty state without errors
      expect(screen.getByText(/usado: 0\/5/i)).toBeInTheDocument();
      expect(screen.getAllByText(/vacío/i)).toHaveLength(5);
    });
  });
});
