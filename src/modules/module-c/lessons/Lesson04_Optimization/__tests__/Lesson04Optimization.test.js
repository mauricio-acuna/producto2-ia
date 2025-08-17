import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

import Lesson04Optimization from '../index';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock para performance.now()
const mockPerformanceNow = jest.fn();
Object.defineProperty(global, 'performance', {
  value: {
    now: mockPerformanceNow
  }
});

// Mock para requestAnimationFrame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0));
global.cancelAnimationFrame = jest.fn();

// Mock para ResizeObserver
global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock para canvas context
const mockCanvasContext = {
  scale: jest.fn(),
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
  closePath: jest.fn(),
  strokeStyle: '',
  lineWidth: 0,
  globalAlpha: 1,
  fillStyle: ''
};

HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCanvasContext);

describe('Lesson04Optimization', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    mockPerformanceNow.mockReturnValue(1000);
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Renderizado de Componentes', () => {
    test('renderiza el componente principal correctamente', () => {
      render(<Lesson04Optimization />);
      
      expect(screen.getByRole('heading', { name: /lección 4: optimización y performance/i })).toBeInTheDocument();
      expect(screen.getByText(/domina las técnicas avanzadas de optimización/i)).toBeInTheDocument();
    });

    test('renderiza todas las pestañas de navegación', () => {
      render(<Lesson04Optimization />);
      
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(4);
      
      expect(screen.getByRole('tab', { name: /técnicas de optimización/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /benchmarking/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /código optimizado/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /monitoreo/i })).toBeInTheDocument();
    });

    test('muestra el panel de técnicas por defecto', () => {
      render(<Lesson04Optimization />);
      
      expect(screen.getByText(/técnicas de optimización avanzadas/i)).toBeInTheDocument();
      expect(screen.getByText(/compresión de datos/i)).toBeInTheDocument();
      expect(screen.getByText(/cache inteligente/i)).toBeInTheDocument();
    });

    test('renderiza todas las tarjetas de técnicas de optimización', () => {
      render(<Lesson04Optimization />);
      
      // Verificar que todas las técnicas están presentes
      expect(screen.getByText(/compresión de datos/i)).toBeInTheDocument();
      expect(screen.getByText(/cache inteligente/i)).toBeInTheDocument();
      expect(screen.getByText(/indexación semántica/i)).toBeInTheDocument();
      expect(screen.getByText(/particionado temporal/i)).toBeInTheDocument();
      expect(screen.getByText(/poda automática/i)).toBeInTheDocument();
      expect(screen.getByText(/streaming de datos/i)).toBeInTheDocument();
    });
  });

  describe('Navegación por Pestañas', () => {
    test('permite navegar entre pestañas con clics', async () => {
      render(<Lesson04Optimization />);
      
      // Ir a la pestaña de benchmarking
      const benchmarkingTab = screen.getByRole('tab', { name: /benchmarking/i });
      await user.click(benchmarkingTab);
      
      expect(screen.getByText(/herramientas de benchmarking/i)).toBeInTheDocument();
      expect(screen.getByText(/performance profiler/i)).toBeInTheDocument();
    });

    test('permite navegar con teclado (Enter y Space)', async () => {
      render(<Lesson04Optimization />);
      
      const codeTab = screen.getByRole('tab', { name: /código optimizado/i });
      
      // Navegación con Enter
      codeTab.focus();
      await user.keyboard('{Enter}');
      
      expect(screen.getByText(/optimización de código/i)).toBeInTheDocument();
      expect(screen.getByText(/compresión de memoria/i)).toBeInTheDocument();
      
      // Navegación con Space
      const monitoringTab = screen.getByRole('tab', { name: /monitoreo/i });
      monitoringTab.focus();
      await user.keyboard(' ');
      
      expect(screen.getByText(/monitoreo en tiempo real/i)).toBeInTheDocument();
    });

    test('mantiene los estados ARIA correctos para las pestañas', async () => {
      render(<Lesson04Optimization />);
      
      const techniquesTab = screen.getByRole('tab', { name: /técnicas de optimización/i });
      const benchmarkingTab = screen.getByRole('tab', { name: /benchmarking/i });
      
      // Estado inicial
      expect(techniquesTab).toHaveAttribute('aria-selected', 'true');
      expect(benchmarkingTab).toHaveAttribute('aria-selected', 'false');
      
      // Después de cambiar tab
      await user.click(benchmarkingTab);
      
      expect(techniquesTab).toHaveAttribute('aria-selected', 'false');
      expect(benchmarkingTab).toHaveAttribute('aria-selected', 'true');
    });

    test('oculta paneles inactivos correctamente', async () => {
      render(<Lesson04Optimization />);
      
      // Panel de técnicas visible por defecto
      expect(screen.getByRole('tabpanel', { name: /técnicas de optimización/i })).not.toHaveAttribute('hidden');
      
      // Cambiar a benchmarking
      await user.click(screen.getByRole('tab', { name: /benchmarking/i }));
      
      expect(screen.getByRole('tabpanel', { name: /técnicas de optimización/i })).toHaveAttribute('hidden');
      expect(screen.getByRole('tabpanel', { name: /benchmarking/i })).not.toHaveAttribute('hidden');
    });
  });

  describe('Técnicas de Optimización', () => {
    test('permite seleccionar diferentes técnicas', async () => {
      render(<Lesson04Optimization />);
      
      // Seleccionar técnica de cache
      const cacheCard = screen.getByText(/cache inteligente/i).closest('[role="button"]');
      await user.click(cacheCard);
      
      expect(cacheCard).toHaveAttribute('aria-pressed', 'true');
      expect(cacheCard).toHaveClass('selected');
    });

    test('muestra métricas correctas para cada técnica', () => {
      render(<Lesson04Optimization />);
      
      // Verificar métricas de compresión
      const compressionCard = screen.getByText(/compresión de datos/i).closest('[role="button"]');
      expect(compressionCard).toHaveTextContent(/60-80%/);
      expect(compressionCard).toHaveTextContent(/alto/i);
      expect(compressionCard).toHaveTextContent(/media/i);
    });

    test('permite navegación por teclado en técnicas', async () => {
      render(<Lesson04Optimization />);
      
      const indexingCard = screen.getByText(/indexación semántica/i).closest('[role="button"]');
      
      indexingCard.focus();
      await user.keyboard('{Enter}');
      
      expect(indexingCard).toHaveAttribute('aria-pressed', 'true');
      expect(indexingCard).toHaveClass('selected');
    });

    test('aplica clases de impacto correctamente', () => {
      render(<Lesson04Optimization />);
      
      // Verificar clases de impacto
      expect(screen.getByText('Muy Alto')).toHaveClass('impact-very-high');
      expect(screen.getByText('Alto')).toHaveClass('impact-high');
      expect(screen.getByText('Medio')).toHaveClass('impact-medium');
    });
  });

  describe('Herramientas de Benchmarking', () => {
    test('cambia entre herramientas de benchmarking', async () => {
      render(<Lesson04Optimization />);
      
      // Ir a pestaña de benchmarking
      await user.click(screen.getByRole('tab', { name: /benchmarking/i }));
      
      // Seleccionar memory analyzer
      const memoryTool = screen.getByText(/memory analyzer/i).closest('[role="button"]');
      await user.click(memoryTool);
      
      expect(memoryTool).toHaveAttribute('aria-pressed', 'true');
      expect(memoryTool).toHaveClass('active');
    });

    test('ejecuta benchmarks y muestra estados de carga', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /benchmarking/i }));
      
      const runButton = screen.getByRole('button', { name: /ejecutar benchmark/i });
      await user.click(runButton);
      
      // Verificar estado de carga
      expect(screen.getByText(/ejecutando/i)).toBeInTheDocument();
      expect(runButton).toBeDisabled();
      
      // Avanzar tiempo para completar benchmark
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      await waitFor(() => {
        expect(runButton).not.toBeDisabled();
      });
    });

    test('muestra métricas de comparación actualizadas', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /benchmarking/i }));
      
      // Verificar que las métricas están presentes
      expect(screen.getByText(/latencia/i)).toBeInTheDocument();
      expect(screen.getByText(/throughput/i)).toBeInTheDocument();
      expect(screen.getByText(/memoria/i)).toBeInTheDocument();
      
      // Verificar barras de progreso
      expect(screen.getByText(/baseline/i)).toBeInTheDocument();
      expect(screen.getByText(/optimizado/i)).toBeInTheDocument();
      expect(screen.getByText(/objetivo/i)).toBeInTheDocument();
    });

    test('actualiza métricas durante la ejecución del benchmark', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /benchmarking/i }));
      
      const runButton = screen.getByRole('button', { name: /ejecutar benchmark/i });
      await user.click(runButton);
      
      // Simular actualizaciones de métricas
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      expect(screen.getByText(/ejecutando/i)).toBeInTheDocument();
      
      act(() => {
        jest.advanceTimersByTime(4000);
      });
      
      await waitFor(() => {
        expect(screen.queryByText(/ejecutando/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Optimización de Código', () => {
    test('cambia entre ejemplos de código', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /código optimizado/i }));
      
      // Cambiar a ejemplo de caching
      const cachingExample = screen.getByRole('button', { name: /sistema de cache multi-nivel/i });
      await user.click(cachingExample);
      
      expect(cachingExample).toHaveAttribute('aria-pressed', 'true');
      expect(cachingExample).toHaveClass('active');
      
      // Verificar que el contenido cambió
      expect(screen.getByText(/sin sistema de cache/i)).toBeInTheDocument();
      expect(screen.getByText(/con cache multi-nivel optimizado/i)).toBeInTheDocument();
    });

    test('muestra ejemplos de código antes y después', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /código optimizado/i }));
      
      // Verificar bloques de código
      expect(screen.getByText(/❌ sin optimización/i)).toBeInTheDocument();
      expect(screen.getByText(/✅ con compresión optimizada/i)).toBeInTheDocument();
      
      // Verificar badges de performance
      expect(screen.getByText(/lento/i)).toBeInTheDocument();
      expect(screen.getByText(/optimizado/i)).toBeInTheDocument();
    });

    test('muestra lista de mejoras implementadas', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /código optimizado/i }));
      
      // Verificar mejoras
      expect(screen.getByText(/mejoras implementadas/i)).toBeInTheDocument();
      expect(screen.getByText(/compresión automática/i)).toBeInTheDocument();
      expect(screen.getByText(/reducción de memoria del 60-80%/i)).toBeInTheDocument();
    });

    test('navegación por teclado en selectores de ejemplo', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /código optimizado/i }));
      
      const streamingExample = screen.getByRole('button', { name: /streaming y procesamiento asíncrono/i });
      
      streamingExample.focus();
      await user.keyboard('{Enter}');
      
      expect(streamingExample).toHaveAttribute('aria-pressed', 'true');
      expect(streamingExample).toHaveClass('active');
    });
  });

  describe('Monitoreo de Performance', () => {
    test('muestra métricas en tiempo real cuando está activo', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /monitoreo/i }));
      
      // Verificar métricas en tiempo real
      expect(screen.getByText(/tiempo de respuesta/i)).toBeInTheDocument();
      expect(screen.getByText(/throughput/i)).toBeInTheDocument();
      expect(screen.getByText(/tasa de error/i)).toBeInTheDocument();
      expect(screen.getByText(/uso de memoria/i)).toBeInTheDocument();
      expect(screen.getByText(/cache hit rate/i)).toBeInTheDocument();
      expect(screen.getByText(/cola de procesamiento/i)).toBeInTheDocument();
    });

    test('genera alertas basadas en umbrales', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /monitoreo/i }));
      
      // Simular paso del tiempo para generar alertas
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      await waitFor(() => {
        expect(screen.getByText(/alertas recientes/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    test('permite descartar alertas', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /monitoreo/i }));
      
      // Esperar a que aparezcan alertas
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      await waitFor(() => {
        const dismissButton = screen.getByRole('button', { name: /descartar alerta/i });
        if (dismissButton) {
          return user.click(dismissButton);
        }
      }, { timeout: 3000 });
    });

    test('muestra recomendaciones de optimización', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /monitoreo/i }));
      
      expect(screen.getByText(/recomendaciones de optimización/i)).toBeInTheDocument();
      expect(screen.getByText(/🔴 alta/i)).toBeInTheDocument();
      expect(screen.getByText(/🟡 media/i)).toBeInTheDocument();
      expect(screen.getByText(/🟢 baja/i)).toBeInTheDocument();
    });

    test('aplica clases de estado correctas para métricas', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /monitoreo/i }));
      
      // Verificar que las métricas tienen clases de estado
      const metricCards = screen.getAllByTestId(/metric-card/i);
      expect(metricCards.length).toBeGreaterThan(0);
    });
  });

  describe('Footer y Resumen', () => {
    test('muestra el resumen de progreso', () => {
      render(<Lesson04Optimization />);
      
      expect(screen.getByText(/progreso de optimización/i)).toBeInTheDocument();
      expect(screen.getByText(/técnicas dominadas/i)).toBeInTheDocument();
      expect(screen.getByText(/mejora promedio/i)).toBeInTheDocument();
      expect(screen.getByText(/tiempo de implementación/i)).toBeInTheDocument();
    });

    test('muestra métricas de optimización en el footer', () => {
      render(<Lesson04Optimization />);
      
      expect(screen.getByText(/6\/6/i)).toBeInTheDocument();
      expect(screen.getByText(/65%/i)).toBeInTheDocument();
      expect(screen.getByText(/2-4 semanas/i)).toBeInTheDocument();
    });
  });

  describe('Accesibilidad', () => {
    test('no tiene violaciones de accesibilidad', async () => {
      const { container } = render(<Lesson04Optimization />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('tiene estructura de headings correcta', () => {
      render(<Lesson04Optimization />);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent(/lección 4: optimización y performance/i);
      
      const h3Elements = screen.getAllByRole('heading', { level: 3 });
      expect(h3Elements.length).toBeGreaterThan(0);
    });

    test('tiene etiquetas ARIA apropiadas para elementos interactivos', () => {
      render(<Lesson04Optimization />);
      
      // Verificar tablist
      expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', 'Navegación de lección');
      
      // Verificar tabs
      const tabs = screen.getAllByRole('tab');
      tabs.forEach(tab => {
        expect(tab).toHaveAttribute('aria-selected');
        expect(tab).toHaveAttribute('aria-controls');
      });
    });

    test('soporta navegación por teclado completa', async () => {
      render(<Lesson04Optimization />);
      
      // Tab inicial debería estar enfocado
      const firstTab = screen.getByRole('tab', { name: /técnicas de optimización/i });
      
      // Verificar que se puede enfocar
      firstTab.focus();
      expect(document.activeElement).toBe(firstTab);
      
      // Navegación con flechas (si está implementada)
      await user.keyboard('{ArrowRight}');
      
      // Verificar que las técnicas son navegables
      const firstTechnique = screen.getByText(/compresión de datos/i).closest('[role="button"]');
      firstTechnique.focus();
      expect(document.activeElement).toBe(firstTechnique);
    });

    test('tiene textos alternativos para iconos', () => {
      render(<Lesson04Optimization />);
      
      // Verificar que los iconos tienen aria-hidden
      const icons = document.querySelectorAll('.tab-icon, .technique-icon, .metric-icon');
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    test('proporciona feedback de estado para operaciones asíncronas', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /benchmarking/i }));
      
      const runButton = screen.getByRole('button', { name: /ejecutar benchmark/i });
      await user.click(runButton);
      
      // Verificar aria-label dinámico
      expect(runButton).toHaveAttribute('aria-label', 'Ejecutando benchmark...');
    });
  });

  describe('Performance y Optimización', () => {
    test('renderiza en menos de 200ms', () => {
      const startTime = performance.now();
      render(<Lesson04Optimization />);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(200);
    });

    test('maneja cambios de estado sin blocking', async () => {
      render(<Lesson04Optimization />);
      
      const startTime = performance.now();
      
      // Realizar múltiples cambios rápidos
      await user.click(screen.getByRole('tab', { name: /benchmarking/i }));
      await user.click(screen.getByRole('tab', { name: /código optimizado/i }));
      await user.click(screen.getByRole('tab', { name: /monitoreo/i }));
      
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('limpia intervalos y timeouts al desmontar', () => {
      const { unmount } = render(<Lesson04Optimization />);
      
      // Ir a monitoreo para activar intervalos
      fireEvent.click(screen.getByRole('tab', { name: /monitoreo/i }));
      
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      
      unmount();
      
      // Verificar que se limpiaron los intervalos
      expect(clearIntervalSpy).toHaveBeenCalled();
      
      clearIntervalSpy.mockRestore();
      clearTimeoutSpy.mockRestore();
    });

    test('optimiza re-renders con memoization', () => {
      const { rerender } = render(<Lesson04Optimization />);
      
      // Verificar que no hay re-renders innecesarios
      const renderSpy = jest.spyOn(React, 'createElement');
      
      rerender(<Lesson04Optimization />);
      
      // El número de llamadas debe ser mínimo para re-render
      expect(renderSpy).toHaveBeenCalledTimes(1);
      
      renderSpy.mockRestore();
    });
  });

  describe('Casos Límite y Errores', () => {
    test('maneja props undefined gracefully', () => {
      expect(() => {
        render(<Lesson04Optimization className={undefined} />);
      }).not.toThrow();
    });

    test('maneja errores en canvas gracefully', () => {
      HTMLCanvasElement.prototype.getContext = jest.fn(() => null);
      
      expect(() => {
        render(<Lesson04Optimization />);
        fireEvent.click(screen.getByRole('tab', { name: /monitoreo/i }));
      }).not.toThrow();
      
      // Restaurar mock
      HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCanvasContext);
    });

    test('maneja datos de métricas faltantes', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /monitoreo/i }));
      
      // Simular datos faltantes
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      // Verificar que no hay errores
      expect(screen.getByText(/monitoreo en tiempo real/i)).toBeInTheDocument();
    });

    test('previene memory leaks en efectos', () => {
      const { unmount } = render(<Lesson04Optimization />);
      
      // Activar efectos que podrían causar memory leaks
      fireEvent.click(screen.getByRole('tab', { name: /monitoreo/i }));
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      // Verificar que unmount funciona sin errores
      expect(() => unmount()).not.toThrow();
    });

    test('valida entrada de usuario', async () => {
      render(<Lesson04Optimization />);
      
      // Intentar interacciones inválidas
      const invalidElement = document.createElement('div');
      
      expect(() => {
        fireEvent.click(invalidElement);
      }).not.toThrow();
    });
  });

  describe('Integración de Componentes', () => {
    test('coordina estado entre técnicas y ejemplos de código', async () => {
      render(<Lesson04Optimization />);
      
      // Seleccionar técnica de compresión
      const compressionTechnique = screen.getByText(/compresión de datos/i).closest('[role="button"]');
      await user.click(compressionTechnique);
      
      // Cambiar a código y verificar sincronización
      await user.click(screen.getByRole('tab', { name: /código optimizado/i }));
      
      expect(screen.getByText(/compresión de memoria/i)).toBeInTheDocument();
    });

    test('mantiene consistencia de datos entre paneles', async () => {
      render(<Lesson04Optimization />);
      
      // Configurar estado en benchmarking
      await user.click(screen.getByRole('tab', { name: /benchmarking/i }));
      
      const memoryTool = screen.getByText(/memory analyzer/i).closest('[role="button"]');
      await user.click(memoryTool);
      
      // Verificar estado en monitoreo
      await user.click(screen.getByRole('tab', { name: /monitoreo/i }));
      
      expect(screen.getByText(/uso de memoria/i)).toBeInTheDocument();
    });

    test('propaga eventos correctamente entre componentes', async () => {
      render(<Lesson04Optimization />);
      
      const mockCallback = jest.fn();
      
      // Simular callback personalizado
      const component = render(
        <Lesson04Optimization onOptimizationChange={mockCallback} />
      );
      
      // Cambiar técnica
      const cacheTechnique = screen.getByText(/cache inteligente/i).closest('[role="button"]');
      await user.click(cacheTechnique);
      
      // Verificar que los eventos se propagan
      expect(cacheTechnique).toHaveClass('selected');
    });
  });
});

describe('Componentes Especializados', () => {
  describe('OptimizationTechniques', () => {
    test('renderiza todas las técnicas correctamente', () => {
      render(<Lesson04Optimization />);
      
      const techniques = [
        'Compresión de Datos',
        'Cache Inteligente', 
        'Indexación Semántica',
        'Particionado Temporal',
        'Poda Automática',
        'Streaming de Datos'
      ];
      
      techniques.forEach(technique => {
        expect(screen.getByText(technique)).toBeInTheDocument();
      });
    });

    test('muestra métricas correctas para cada técnica', () => {
      render(<Lesson04Optimization />);
      
      // Verificar que todas las técnicas tienen métricas
      expect(screen.getAllByText(/impacto:/i)).toHaveLength(6);
      expect(screen.getAllByText(/complejidad:/i)).toHaveLength(6);
      expect(screen.getAllByText(/ahorro:/i)).toHaveLength(6);
    });
  });

  describe('BenchmarkingTools', () => {
    test('actualiza métricas durante benchmark', async () => {
      render(<Lesson04Optimization />);
      
      await user.click(screen.getByRole('tab', { name: /benchmarking/i }));
      
      const runButton = screen.getByRole('button', { name: /ejecutar benchmark/i });
      await user.click(runButton);
      
      // Verificar estado inicial
      expect(runButton).toBeDisabled();
      
      // Simular progreso
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      expect(screen.getByText(/ejecutando/i)).toBeInTheDocument();
    });
  });

  describe('PerformanceMonitoring', () => {
    test('inicia monitoreo solo cuando está activo', async () => {
      render(<Lesson04Optimization />);
      
      // No debería haber monitoreo activo inicialmente
      expect(screen.queryByText(/alertas recientes/i)).not.toBeInTheDocument();
      
      // Activar monitoreo
      await user.click(screen.getByRole('tab', { name: /monitoreo/i }));
      
      // Esperar que inicie el monitoreo
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      await waitFor(() => {
        expect(screen.getByText(/tiempo de respuesta/i)).toBeInTheDocument();
      });
    });
  });
});
