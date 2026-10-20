# Cousins Shop - Tienda de Manualidades 🛍️

Catálogo de tienda de manualidades y decoraciones con estilo elegante y femenino.

## 🌸 Características

- Catálogo de productos de manualidades
- Diseño elegante con tonos rosas (#e26899)
- Búsqueda en tiempo real
- Imágenes desde el backend
- Precios en euros (€)

## 🛠️ Tecnologías

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Estilos:** CSS personalizado
- **Monorepo:** pnpm workspaces + Turborepo
- **Despliegue:** Railway

## 📁 Estructura

```
apps/
  backend/    # API Express (tienda-backend), sirve también el build del frontend
  frontend/   # React + Vite (tienda-frontend)
packages/     # Código compartido entre apps (opcional)
```

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/cousins-shop.git
cd cousins-shop

# Instalar todo el monorepo (desde la raíz)
pnpm install

# Levantar backend y frontend a la vez
pnpm dev

# Compilar y arrancar como en producción
pnpm build
pnpm start
```