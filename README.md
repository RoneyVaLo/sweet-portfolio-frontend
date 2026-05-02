# 🍰 Sweet Portfolio Frontend

Una elegante aplicación web frontend construida con **React** y **Vite** para un portfolio y catálogo de productos. Diseñada con componentes modernos de **Radix UI** y estilos impecables con **Tailwind CSS**.

## 🌟 Características

- **Portada Heroica** - Sección de presentación personalizada con imagen de perfil
- **Catálogo de Productos** - Galería de imágenes con carrusel interactivo
- **Blog Integrado** - Sección dinámmica de artículos y contenido
- **Preguntas Frecuentes (FAQ)** - Acordeones accesibles para respuestas comunes
- **Modal de Imágenes** - Visualización ampliada de productos
- **Botón de WhatsApp** - Integración directa para contacto
- **Navbar Responsivo** - Navegación adaptativa con enlaces a secciones
- **Pie de Página** - Footer con información completa
- **Carga Progresiva** - Componentes esqueleto (skeleton) para mejor UX
- **Optimización de Imágenes** - Redimensionamiento automático de URLs
- **Diseño Responsivo** - Totalmente adaptable a dispositivos móviles y desktop

## 🛠️ Tecnologías

### Frontend

- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor seguridad
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework de utilidades de CSS
- **Radix UI** - Componentes sin estilos y accesibles
- **Lucide React** - Iconografía moderna

### Formularios y Validación

- **React Hook Form** - Gestión eficiente de formularios
- **Zod** - Validación de esquemas de datos

### Herramientas

- **ESLint** - Linting y análisis de código
- **Vitest** - Framework de testing
- **PNPM** - Gestor de paquetes rápido

## 📋 Requisitos Previos

- Node.js 18+ (recomendado 20+)
- PNPM 8+

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables globales
│   ├── ImageModal.tsx   # Modal para visualizar imágenes
│   ├── Navbar.tsx       # Barra de navegación
│   ├── WhatsAppButton.tsx
│   └── ui/              # Componentes UI base
├── features/            # Características principales (domain-driven)
│   ├── blog/            # Sección de blog
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── catalog/         # Catálogo de productos
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── faq/             # Preguntas frecuentes
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   └── home/            # Página de inicio
├── hooks/               # Hooks personalizados globales
├── lib/
│   ├── services/        # Servicios API
│   └── utils.ts         # Utilidades generales
├── helpers/             # Funciones auxiliares
├── types/               # Definiciones de tipos TypeScript
└── App.tsx              # Componente principal
```

## 🔌 Integración con API

El proyecto se conecta con una API Strapi para obtener datos dinámicos:

- **Perfil de usuario** - Nombre, imagen, información de contacto
- **Productos/Catálogo** - Imágenes y detalles
- **Artículos de Blog** - Contenido y metadatos
- **FAQ** - Preguntas y respuestas

## 📱 Optimización de Imágenes

El proyecto incluye utilidades para optimizar URLs de imágenes automáticamente, proporcionando mejor rendimiento en diferentes dispositivos.

---
