# 📦 Sistema de Gestión de Inventarios Empresarial

Aplicación web completa para gestionar inventarios con roles de usuario, CRUD de productos, movimientos de inventario y estadísticas. ¡100% sin frameworks, solo HTML, CSS y JavaScript puro!

---

## 📁 Estructura del Proyecto

```
Sistema de inventario con ia/
│
├── index.html                 # Archivo raíz que redirige al HTML principal
│
├── html/
│   └── index.html            # Archivo HTML principal con toda la estructura
│
├── css/
│   └── styles.css            # Estilos CSS puro (sin frameworks)
│
├── js/
│   └── app.js                # Lógica JavaScript Vanilla
│
└── README.md                 # Este archivo
```

---

## 🚀 Cómo Usar la Aplicación

### 1. Abrir la aplicación
- Abre `index.html` desde la raíz del proyecto en tu navegador
- O accede directamente a `html/index.html`

### 2. Seleccionar rol
- Haz clic en la tarjeta "Administrador" o "Empleado"
- El sistema cargará automáticamente

### 3. Usar la aplicación
- Los datos se guardan automáticamente en `localStorage`
- Cierra sesión cuando quieras y vuelve a entrar

---

## 👥 Roles de Usuario

### 🔐 Administrador
Acceso completo a todas las funciones:
- ✅ Crear, editar y eliminar productos
- ✅ Gestionar categorías (crear y eliminar)
- ✅ Registrar movimientos de inventario
- ✅ Ver estadísticas avanzadas
- ✅ Acceso a panel de estadísticas completo
- ✅ Eliminar movimientos de inventario

### 👤 Empleado
Acceso limitado y controlado:
- ✅ Ver dashboard e inventario completo
- ✅ Registrar movimientos de entrada y salida
- ✅ Ver historial de movimientos
- ❌ No puede eliminar productos
- ❌ No puede crear/eliminar categorías
- ❌ No tiene acceso a estadísticas
- ❌ No puede eliminar movimientos

---

## 📋 Funcionalidades Detalladas

### 📊 Dashboard
- **Estadísticas en tiempo real:**
  - Total de productos
  - Stock total disponible
  - Cantidad de productos con bajo stock (< 5)
  - Valor total del inventario
- **Movimientos recientes:** Últimos 10 movimientos registrados
- **Acceso rápido** a la información más importante

### 📦 Gestión de Productos
- **Crear productos** con:
  - Nombre
  - Categoría asignada
  - Precio unitario
  - Stock inicial
- **Editar productos** desde un modal intuitivo
- **Eliminar productos** (solo Admin)
- **Vista de tabla** con:
  - Código de producto (ID)
  - Nombre
  - Categoría asignada
  - Precio
  - Stock con colores indicadores
- **Validaciones:** Todos los campos requeridos

### 🏷️ Gestión de Categorías
- **Crear nuevas categorías** con nombre único
- **Eliminar categorías** (solo si no tienen productos asociados)
- **Ver contador** de productos por categoría
- **Validaciones:** Previene categorías duplicadas

### 📤 Movimientos de Inventario
- **Registrar entradas** (compras/ingresos)
- **Registrar salidas** (ventas/pérdidas)
- **Validaciones:**
  - Previene salidas sin stock suficiente
  - Actualiza automáticamente el stock
  - No permite cantidades negativas
- **Historial completo** de movimientos con:
  - Producto
  - Tipo (Entrada/Salida)
  - Cantidad
  - Fecha y hora automática
- **Eliminar movimientos** (solo Admin) con reversión de stock

### 📈 Estadísticas (Solo Admin)
- **Resumen de movimientos:**
  - Total de entradas
  - Total de salidas
  - Diferencia neta
- **Productos con bajo stock:**
  - Lista de productos con menos de 5 unidades
  - Mostrados en orden ascendente
  - Con precio y categoría
- **Producto más activo:**
  - Producto con más movimientos
  - Stock actual
  - Precio

---

## 💾 Persistencia de Datos

Todos los datos se guardan automáticamente en `localStorage` del navegador:
- **localStorage key:** `inventoryData`
- **Contenido:**
  - Categorías creadas
  - Todos los productos con detalles
  - Historial completo de movimientos
- **Características:**
  - Datos persisten al recargar la página
  - Se mantienen entre sesiones
  - Disponibles offline

### Estructura de datos guardados
```javascript
{
  categories: [...],
  products: [...],
  movements: [...]
}
```

---

## 🎨 Diseño y Estilos

### Características visuales
- **CSS Puro:** Sin Bootstrap, Tailwind u otros frameworks
- **Responsivo:** Se adapta perfectamente a cualquier pantalla
- **Gradientes:** Fondos atractivos con colores modernos
- **Animaciones:** Transiciones suaves en:
  - Cambio de secciones
  - Apertura de modales
  - Alertas
- **Paleta de colores:**
  - Primario: Azul-Púrpura (#667eea - #764ba2)
  - Éxito: Verde (#51cf66)
  - Peligro: Rojo (#ff6b6b)
  - Advertencia: Naranja (#ffa500)

### Componentes estilizados
- **Header:** Con título y selector de rol
- **Tablas:** Con bordes, hover effects y estilos claros
- **Formularios:** Campos bien organizados con validación visual
- **Botones:** Diferenciados por color y función
- **Modales:** Con overlay y animaciones
- **Alertas:** Con colores según tipo (éxito, error, advertencia)
- **Cards:** Para estadísticas con gradientes

---

## 🔧 Tecnologías Utilizadas

### Frontend
- **HTML5:** Estructura semántica moderna
- **CSS3:** 
  - Flexbox y Grid para layouts
  - Gradientes lineales
  - Animaciones y transiciones
  - Media queries para responsividad
  - Variables de estilos
- **JavaScript Vanilla:**
  - ES6+ (arrow functions, template literals, map, filter, etc.)
  - DOM manipulation
  - Event handling
  - JSON parsing

### Almacenamiento
- **localStorage API:** Para persistencia de datos

---

## 📱 Compatibilidad

### Navegadores soportados
- ✅ Chrome/Chromium (50+)
- ✅ Firefox (55+)
- ✅ Safari (11+)
- ✅ Edge (15+)

### Dispositivos
- 💻 Escritorio
- 📱 Móviles
- 📲 Tablets
- ⌚ Pantallas pequeñas (responsive)

---

## 🔐 Restricciones de Seguridad (Roles)

### Protección por Rol - Administrador
- Acceso a todas las funciones
- Puede eliminar cualquier elemento
- Ve todas las estadísticas

### Protección por Rol - Empleado
- No puede eliminar productos
- No puede crear ni eliminar categorías
- No puede ver estadísticas
- No puede eliminar movimientos
- Acceso limitado a lectura y creación

---

## 📊 Modelos de Datos

### Categoría
```javascript
{
  id: 1707674400000,        // timestamp únido
  name: "Electrónica"       // nombre de la categoría
}
```

### Producto
```javascript
{
  id: 1707674400001,        // timestamp único
  name: "Laptop Dell",      // nombre del producto
  categoryId: 1707674400000,// referencia a categoría
  price: 899.99,            // precio unitario
  stock: 15                 // cantidad disponible
}
```

### Movimiento
```javascript
{
  id: 1707674400002,        // timestamp único
  productId: 1707674400001, // referencia a producto
  type: "entrada",          // "entrada" o "salida"
  quantity: 5,              // cantidad movida
  date: "2026-02-12T10:30:00.000Z" // fecha ISO
}
```

---

## ⚡ Características Técnicas

### Performance
- ⚡ Carga instantánea
- 🔄 Actualización en tiempo real
- 📴 Funciona totalmente offline
- 💾 Bajo consumo de memoria
- 🚀 Sin peticiones al servidor

### Validaciones
- ✅ Campos requeridos
- ✅ Prevención de valores negativos
- ✅ Validación de stock suficiente
- ✅ Prevención de categorías duplicadas
- ✅ Prevención de eliminación de categorías con productos

### Experiencia de usuario
- 🎯 Interfaz intuitiva
- 📢 Mensajes de confirmación
- ⚠️ Alertas de error claras
- ✨ Animaciones suaves
- 🎨 Diseño atractivo

---

## 🎯 Casos de Uso

### Administrador
1. Inicia sesión como Admin
2. Crea categorías base (Electrónica, oficina, etc.)
3. Crea productos en el sistema
4. Empleados registran movimientos
5. Revisa estadísticas y reportes

### Empleado
1. Inicia sesión como Empleado
2. Ve el inventario actual
3. Registra entry de compras
4. Registra salidas de ventas
5. Puede ver el historial completo

---

## 📝 Notas Importantes

- **Backup:** Los datos se guardan solo en localStorage del navegador
- **Sincronización:** No hay sincronización entre dispositivos
- **Límite:** Está limitado al almacenamiento del navegador (~5-10MB)
- **Privacidad:** Los datos no se envían a ningún servidor
- **Cookies:** No utiliza cookies
- **Tracking:** No realiza tracking de usuarios

---

## 🐛 Solución de Problemas

### Los datos desaparecieron
- **Causa:** Limpieza de localStorage del navegador
- **Solución:** Los datos se perderán si se limpian los datos del navegador

### No puedo eliminar una categoría
- **Causa:** Tiene productos asociados
- **Solución:** Primero elimina los productos de esa categoría

### El stock está negativo
- **Causa:** Error en movimientos anteriores
- **Solución:** Usa movimientos manuales para corregir

### No me deja registrar una salida
- **Causa:** No hay suficiente stock
- **Solución:** Registra primero una entrada de compra

---

## 🚀 Mejoras Futuras Posibles

- 📊 Exportar datos a CSV/Excel
- 🔍 Búsqueda y filtros avanzados
- 📱 Aplicación móvil
- 🌐 Sincronización en la nube
- 📈 Gráficos y charts
- 🔐 Autenticación real con servidor
- 📧 Notificaciones por email
- 📱 Descarga de reportes

---

## 📄 Licencia

Proyecto libre para uso personal y comercial.

---

## 👨‍💻 Autor

**Desarrollado:** Febrero 2026  
**Versión:** 1.0  
**Estado:** Completo y funcional

---

## 📞 Contacto y Soporte

Para reportar bugs o sugerencias, documenta:
- Navegador y versión
- Pasos para reproducir
- Comportamiento esperado
- Comportamiento actual

---

**¡Gracias por usar el Sistema de Gestión de Inventarios Empresarial!** 🎉
