# 🚚 App de Gestión de Ordenes de Logística

*Esta aplicación web de Gestión de Ordenes de Logística fue desarrollada con React + Material UI (MUI), está diseñada para el control de paqueteria y es la presentación del trabajo integrador de Frontend de PilarTecno-MERN Stack de la alumna Victoria Antonela Galleguillo.*

Permite visualizar todas las ordenes en un listado con algunos de sus respectivos datos, así como aplicar filtros y buscar ordenes, con tarjetas dinamicas gráficas. Está pensada con una arquitectura modular, reutilizable y preparada para conectarse con una API REST real.

### 🪼 Características principales

1. Tiene un listado interactivo de órdenes con datos dinámicos (destino, estado, repartidor, peso, fecha, etc.).
2. Tiene un buscador inteligente con filtros por múltiples campos.
3. Existencia de tarjetas estadísticas que resume información clave.
4. Un gráfico para visualizar rápidamente el estado de las órdenes.
5. Cuenta con un drawer lateral de filtros (responsive y con categorías, estado, peso y fecha).
6. Tuve el objetivo de implementar un diseño responsivo optimizado para escritorio y mobile.
7. Uso de themes: Light Mode y Dark Mode con MUI ThemeProvider. Se diseñó un botón switch para cambiar al tema de preferencia.

### 👩🏼‍💻 Tecnologías usadas

| Tipo  | Tecnología |
| ------------- |:-------------:|
| Framework     | React + Vite     |
| UI Library      | Material UI (MUI v5)     |
| Estado local      | useState + useEffect (base), adaptable a useReducer     |
| Routing      | React Router DOM v6     |
| Gráficos      | Recharts     |
| Iconografía      | MUI Icons     |
| Estilos      | CSS Modules + MUI SX API     |
| HTTP/API      | Fetch / Axios |

### 📁 Estructura del proyecto
``src/`` \
``├── assets/ (imagenes)``\
``├── components/``\
``│   ├── FiltersDrawer.jsx``\
``│   ├── NavBar.jsx``\
``│   ├── StatCard.jsx``\
``│   ├── OrdersHeader.jsx``\
``│   ├── OrdersTable.jsx``\
``│   └── StatusDonut.jsx``\
``│── context/``\
``│   ├── OrdersContext.jsx``\
``│   └── OrdersProvider.jsx``\
``│── hooks/``\
``│   ├── useOrders.js``\
``│   ├── useStats.js``\
``│   └── useOrdersFilter.js``\
``│── pages/``\
``│   ├── Dashboard.jsx``\
``│   ├── OrderDetailPage.jsx``\
``│   └── OrderFormPage.jsx``\
``│── services/``\
``│   ├── api.js``\
``│   └── ordenesService.js``\
``├── styles/``\
``│   ├── StatCard.css``\
``│   ├── CardDashboard.css``\
``│   ├── NavBar.css``\
``│   ├── OrdersDetail.css``\
``│   ├── OrdersHeader.css``\
``│   ├── OrderFormPage.css``\
``│   ├── OrderTable.css``\
``│   ├── FiltersDrawer.css``\
``│   └── StatusDonut.css``\
``├── utils/``\
``│   └── filterOrders.js``\
``├── App.jsx``\
``├── Root.jsx``\
``└── main.jsx``\



### 🛠️ ¿Cómo correr el repositorio?

1. Clonar el repo
```
git clone https://github.com/galleguillovic/logisticafrontend.git
```
2. Instalar depencias
```
npm install
```
3. Iniciar el entorno de desarrollo
```
npm run dev
```

### 💡 Buenas practicas
+ Arquitectura modular con componentes reutilizables y desacoplados.
+ Código limpio, semántico y mantenible.
+ Separación clara entre UI, lógica, estilos y servicios.
+ Componentes optimizados con props tipadas y renderizado condicional.
+ Uso de CSS modular + sistema de temas de MUI.
+ Preparado para conectar con backend mediante servicios.
+ Hooks personalizados para el manejo de filtros y lógica de negocio.

### 🌐 Rutas principales
| Tipo  | Tecnología |
| ------------- |:-------------:|
| /     | Página principal con listado, buscador y gráfico de órdenes     |
| /editar/:idorden   | Formulario para editar una orden     |
| /crear      |  Formulario para crear una nueva orden  |
