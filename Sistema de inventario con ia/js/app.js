// ===================== VARIABLES GLOBALES =====================
let currentRole = null;
let editingProductId = null;
let deleteTarget = null;

// Estructura de datos
const data = {
  categories: [],
  products: [],
  movements: [],
};

// ===================== ALMACENAMIENTO LOCAL =====================

/**
 * Guarda los datos en localStorage
 */
function saveToLocalStorage() {
  localStorage.setItem("inventoryData", JSON.stringify(data));
}

/**
 * Carga los datos desde localStorage
 */
function loadFromLocalStorage() {
  const saved = localStorage.getItem("inventoryData");
  if (saved) {
    const parsed = JSON.parse(saved);
    data.categories = parsed.categories || [];
    data.products = parsed.products || [];
    data.movements = parsed.movements || [];
  }
}

// ===================== AUTENTICACIÓN Y ROLES =====================

/**
 * Inicializa la aplicación con el rol seleccionado
 */
function initializeApp(role) {
  currentRole = role;
  loadFromLocalStorage();

  // Mostrar app, ocultar login
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("appContainer").classList.add("active");

  // Establecer rol en display
  document.getElementById("roleDisplay").textContent =
    currentRole === "admin" ? "Administrador" : "Empleado";

  // Crear navegación
  createNavigation();

  // Cargar datos iniciales
  refreshAllData();
}

/**
 * Cierra sesión
 */
function logout() {
  currentRole = null;
  document.getElementById("loginContainer").style.display = "flex";
  document.getElementById("appContainer").classList.remove("active");
  document.getElementById("navTabs").innerHTML = "";
  clearSections();
}

// ===================== NAVEGACIÓN =====================

/**
 * Crea la barra de navegación según el rol
 */
function createNavigation() {
  const navTabs = document.getElementById("navTabs");
  navTabs.innerHTML = "";

  const tabs = [
    { id: "dashboard", label: "📊 Dashboard", adminOnly: false },
    { id: "productos", label: "📦 Productos", adminOnly: true },
    { id: "categorias", label: "🏷️ Categorías", adminOnly: true },
    { id: "movimientos", label: "📤 Movimientos", adminOnly: false },
    { id: "estadisticas", label: "📈 Estadísticas", adminOnly: true },
  ];

  tabs.forEach((tab) => {
    if (tab.adminOnly && currentRole !== "admin") return;

    const button = document.createElement("button");
    button.className = `nav-tab ${tab.adminOnly ? "admin-only" : ""}`;
    button.textContent = tab.label;
    button.onclick = () => switchSection(tab.id);

    if (tab.id === "dashboard") button.classList.add("active");
    navTabs.appendChild(button);
  });
}

/**
 * Cambia la sección activa
 */
function switchSection(sectionId) {
  // Actualizar tabs activos
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  event.target.classList.add("active");

  // Actualizar secciones
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });
  document.getElementById(sectionId + "Section").classList.add("active");

  // Refrescar datos de la sección
  refreshSectionData(sectionId);
}

// ===================== GESTIÓN DE ALERTAS =====================

/**
 * Muestra una alerta
 */
function showAlert(message, type = "success") {
  const alertEl = document.getElementById(type + "Alert");
  alertEl.textContent = message;
  alertEl.classList.add("show");

  setTimeout(() => {
    alertEl.classList.remove("show");
  }, 4000);
}

// ===================== GESTIÓN DE MODALES =====================

/**
 * Abre un modal
 */
function openModal(modalId) {
  document.getElementById(modalId).classList.add("show");
}

/**
 * Cierra un modal
 */
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("show");
}

// ===================== GESTIÓN DE CATEGORÍAS =====================

/**
 * Agrega una nueva categoría
 */
function addCategory() {
  const name = document.getElementById("categoryName").value.trim();

  if (!name) {
    showAlert("Por favor ingresa un nombre para la categoría", "error");
    return;
  }

  // Verificar que no exista
  if (
    data.categories.find((c) => c.name.toLowerCase() === name.toLowerCase())
  ) {
    showAlert("Esta categoría ya existe", "error");
    return;
  }

  const category = {
    id: Date.now(),
    name: name,
  };

  data.categories.push(category);
  saveToLocalStorage();

  document.getElementById("categoryName").value = "";
  showAlert("Categoría creada exitosamente", "success");

  refreshAllData();
}

/**
 * Elimina una categoría
 */
function deleteCategory(categoryId) {
  const productsInCategory = data.products.filter(
    (p) => p.categoryId === categoryId,
  );

  if (productsInCategory.length > 0) {
    showAlert(
      "No puedes eliminar una categoría que tiene productos asociados",
      "error",
    );
    return;
  }

  deleteTarget = { type: "category", id: categoryId };
  document.getElementById("deleteMessage").textContent =
    "¿Estás seguro de que deseas eliminar esta categoría?";
  openModal("deleteConfirmModal");
}

// ===================== GESTIÓN DE PRODUCTOS =====================

/**
 * Agrega un nuevo producto
 */
function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const categoryId = parseInt(document.getElementById("productCategory").value);
  const price = parseFloat(document.getElementById("productPrice").value);
  const stock = parseInt(document.getElementById("productStock").value);

  if (!name || !categoryId || !price || stock < 0 || isNaN(price)) {
    showAlert("Por favor completa todos los campos correctamente", "error");
    return;
  }

  const product = {
    id: Date.now(),
    name: name,
    categoryId: categoryId,
    price: price,
    stock: stock,
  };

  data.products.push(product);
  saveToLocalStorage();

  document.getElementById("productName").value = "";
  document.getElementById("productCategory").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productStock").value = "";

  showAlert("Producto agregado exitosamente", "success");
  refreshAllData();
}

/**
 * Abre el modal de edición de producto
 */
function editProduct(productId) {
  const product = data.products.find((p) => p.id === productId);
  if (!product) return;

  editingProductId = productId;

  document.getElementById("editProductName").value = product.name;
  document.getElementById("editProductPrice").value = product.price;
  document.getElementById("editProductStock").value = product.stock;

  // Cargar categorías
  const categorySelect = document.getElementById("editProductCategory");
  categorySelect.innerHTML = "";
  data.categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    option.selected = cat.id === product.categoryId;
    categorySelect.appendChild(option);
  });

  openModal("editProductModal");
}

/**
 * Actualiza un producto
 */
function updateProduct() {
  const name = document.getElementById("editProductName").value.trim();
  const categoryId = parseInt(
    document.getElementById("editProductCategory").value,
  );
  const price = parseFloat(document.getElementById("editProductPrice").value);
  const stock = parseInt(document.getElementById("editProductStock").value);

  if (!name || !categoryId || !price || stock < 0 || isNaN(price)) {
    showAlert("Por favor completa todos los campos correctamente", "error");
    return;
  }

  const product = data.products.find((p) => p.id === editingProductId);
  if (!product) return;

  product.name = name;
  product.categoryId = categoryId;
  product.price = price;
  product.stock = stock;

  saveToLocalStorage();
  closeModal("editProductModal");
  showAlert("Producto actualizado exitosamente", "success");
  refreshAllData();
}

/**
 * Elimina un producto
 */
function deleteProduct(productId) {
  const product = data.products.find((p) => p.id === productId);
  if (!product) return;

  deleteTarget = { type: "product", id: productId };
  document.getElementById("deleteMessage").textContent =
    `¿Estás seguro de que deseas eliminar el producto "${product.name}"?`;
  openModal("deleteConfirmModal");
}

// ===================== GESTIÓN DE MOVIMIENTOS =====================

/**
 * Agrega un nuevo movimiento de inventario
 */
function addMovement() {
  const productId = parseInt(document.getElementById("movementProduct").value);
  const type = document.getElementById("movementType").value;
  const quantity = parseInt(document.getElementById("movementQuantity").value);

  if (!productId || !quantity || quantity <= 0) {
    showAlert("Por favor completa todos los campos correctamente", "error");
    return;
  }

  const product = data.products.find((p) => p.id === productId);
  if (!product) {
    showAlert("Producto no encontrado", "error");
    return;
  }

  // Validar que hay suficiente stock para salidas
  if (type === "salida" && product.stock < quantity) {
    showAlert(`Stock insuficiente. Disponibles: ${product.stock}`, "error");
    return;
  }

  // Crear movimiento
  const movement = {
    id: Date.now(),
    productId: productId,
    type: type,
    quantity: quantity,
    date: new Date().toISOString(),
  };

  // Actualizar stock del producto
  if (type === "entrada") {
    product.stock += quantity;
  } else {
    product.stock -= quantity;
  }

  data.movements.push(movement);
  saveToLocalStorage();

  document.getElementById("movementProduct").value = "";
  document.getElementById("movementQuantity").value = "";

  showAlert("Movimiento registrado exitosamente", "success");
  refreshAllData();
}

/**
 * Elimina un movimiento (solo admin)
 */
function deleteMovement(movementId) {
  if (currentRole !== "admin") {
    showAlert("No tienes permisos para eliminar movimientos", "error");
    return;
  }

  deleteTarget = { type: "movement", id: movementId };
  document.getElementById("deleteMessage").textContent =
    "¿Estás seguro de que deseas eliminar este movimiento? El stock será revertido.";
  openModal("deleteConfirmModal");
}

/**
 * Confirmación de eliminación
 */
function confirmDelete() {
  if (!deleteTarget) return;

  if (deleteTarget.type === "product") {
    data.products = data.products.filter((p) => p.id !== deleteTarget.id);
  } else if (deleteTarget.type === "category") {
    data.categories = data.categories.filter((c) => c.id !== deleteTarget.id);
  } else if (deleteTarget.type === "movement") {
    const movement = data.movements.find((m) => m.id === deleteTarget.id);
    if (movement) {
      const product = data.products.find((p) => p.id === movement.productId);
      if (product) {
        if (movement.type === "entrada") {
          product.stock -= movement.quantity;
        } else {
          product.stock += movement.quantity;
        }
      }
    }
    data.movements = data.movements.filter((m) => m.id !== deleteTarget.id);
  }

  saveToLocalStorage();
  closeModal("deleteConfirmModal");
  showAlert("Elemento eliminado exitosamente", "success");
  refreshAllData();
}

// ===================== REFRESH DE DATOS =====================

/**
 * Refresca todos los datos
 */
function refreshAllData() {
  updateCategorySelect();
  updateProductSelect();
  refreshSectionData("dashboard");
}

/**
 * Refresca los datos de una sección específica
 */
function refreshSectionData(sectionId) {
  if (sectionId === "dashboard") refreshDashboard();
  else if (sectionId === "productos") refreshProductsTable();
  else if (sectionId === "categorias") refreshCategoriesTable();
  else if (sectionId === "movimientos") refreshMovementsTable();
  else if (sectionId === "estadisticas") refreshEstadisticas();
}

/**
 * Actualiza el selector de categorías
 */
function updateCategorySelect() {
  const selects = ["productCategory", "editProductCategory"];

  selects.forEach((selectId) => {
    const select = document.getElementById(selectId);
    if (!select) return;

    const currentValue = select.value;
    select.innerHTML = '<option value="">-- Seleccionar Categoría --</option>';

    data.categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.name;
      select.appendChild(option);
    });

    if (selectId === "productCategory") {
      select.value = currentValue;
    }
  });
}

/**
 * Actualiza el selector de productos
 */
function updateProductSelect() {
  const select = document.getElementById("movementProduct");
  if (!select) return;

  const currentValue = select.value;
  select.innerHTML = '<option value="">-- Seleccionar Producto --</option>';

  data.products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    const category = data.categories.find((c) => c.id === product.categoryId);
    option.textContent = `${product.name} (Stock: ${product.stock}) - ${category ? category.name : "Sin categoría"}`;
    option.disabled =
      product.stock === 0 &&
      document.getElementById("movementType")?.value === "salida";
    select.appendChild(option);
  });

  select.value = currentValue;
}

// ===================== DASHBOARD =====================

/**
 * Refresca el dashboard
 */
function refreshDashboard() {
  const container = document.getElementById("dashboardContent");
  const statsGrid = document.getElementById("statsGrid");

  // Estadísticas básicas
  const totalProducts = data.products.length;
  const totalStock = data.products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = data.products.filter((p) => p.stock < 5).length;
  const totalValue = data.products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0,
  );

  statsGrid.innerHTML = `
        <div class="stat-card">
            <h3>Productos Totales</h3>
            <div class="stat-value">${totalProducts}</div>
        </div>
        <div class="stat-card success">
            <h3>Stock Total</h3>
            <div class="stat-value">${totalStock} unidades</div>
        </div>
        <div class="stat-card warning">
            <h3>Productos Bajo Stock</h3>
            <div class="stat-value">${lowStockCount}</div>
        </div>
        <div class="stat-card">
            <h3>Valor Total Inventario</h3>
            <div class="stat-value">$${totalValue.toFixed(2)}</div>
        </div>
    `;

  // Movimientos recientes
  container.innerHTML = `
        <h2 style="margin-bottom: 20px;">Movimientos Recientes</h2>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.movements
                      .slice(-10)
                      .reverse()
                      .map((m) => {
                        const product = data.products.find(
                          (p) => p.id === m.productId,
                        );
                        const date = new Date(m.date).toLocaleString("es-ES");
                        const badgeClass =
                          m.type === "entrada"
                            ? "badge-entrada"
                            : "badge-salida";
                        const typeLabel =
                          m.type === "entrada" ? "Entrada" : "Salida";
                        return `
                            <tr>
                                <td>${product ? product.name : "Producto Eliminado"}</td>
                                <td><span class="badge ${badgeClass}">${typeLabel}</span></td>
                                <td>${m.quantity}</td>
                                <td>${date}</td>
                            </tr>
                        `;
                      })
                      .join("")}
                </tbody>
            </table>
        </div>
        ${data.movements.length === 0 ? '<div class="empty-state"><p>No hay movimientos registrados</p></div>' : ""}
    `;
}

// ===================== TABLA DE PRODUCTOS =====================

/**
 * Refresca la tabla de productos
 */
function refreshProductsTable() {
  const tbody = document.getElementById("productTableBody");
  const emptyState = document.getElementById("productEmptyState");
  const container = document.getElementById("productTableContainer");

  if (data.products.length === 0) {
    tbody.innerHTML = "";
    container.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  container.style.display = "block";
  emptyState.style.display = "none";

  tbody.innerHTML = data.products
    .map((product) => {
      const category = data.categories.find((c) => c.id === product.categoryId);
      const stockClass =
        product.stock < 5
          ? "text-danger"
          : product.stock < 10
            ? "text-warning"
            : "text-success";

      return `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${category ? category.name : "Sin categoría"}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td class="${stockClass}">${product.stock}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-primary btn-small" onclick="editProduct(${product.id})">Editar</button>
                        <button class="btn btn-danger btn-small" onclick="deleteProduct(${product.id})">Eliminar</button>
                    </div>
                </td>
            </tr>
        `;
    })
    .join("");
}

// ===================== TABLA DE CATEGORÍAS =====================

/**
 * Refresca la tabla de categorías
 */
function refreshCategoriesTable() {
  const tbody = document.getElementById("categoryTableBody");
  const emptyState = document.getElementById("categoryEmptyState");
  const container = document.getElementById("categoryTableContainer");

  if (data.categories.length === 0) {
    tbody.innerHTML = "";
    container.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  container.style.display = "block";
  emptyState.style.display = "none";

  tbody.innerHTML = data.categories
    .map((category) => {
      const productCount = data.products.filter(
        (p) => p.categoryId === category.id,
      ).length;

      return `
            <tr>
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>${productCount}</td>
                <td>
                    <button class="btn btn-danger btn-small" onclick="deleteCategory(${category.id})">Eliminar</button>
                </td>
            </tr>
        `;
    })
    .join("");
}

// ===================== TABLA DE MOVIMIENTOS =====================

/**
 * Refresca la tabla de movimientos
 */
function refreshMovementsTable() {
  const tbody = document.getElementById("movementTableBody");
  const emptyState = document.getElementById("movementEmptyState");
  const container = document.getElementById("movementTableContainer");

  if (data.movements.length === 0) {
    tbody.innerHTML = "";
    container.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  container.style.display = "block";
  emptyState.style.display = "none";

  tbody.innerHTML = data.movements
    .map((movement) => {
      const product = data.products.find((p) => p.id === movement.productId);
      const date = new Date(movement.date).toLocaleString("es-ES");
      const badgeClass =
        movement.type === "entrada" ? "badge-entrada" : "badge-salida";
      const typeLabel = movement.type === "entrada" ? "Entrada" : "Salida";
      const deleteBtn =
        currentRole === "admin"
          ? `<button class="btn btn-danger btn-small" onclick="deleteMovement(${movement.id})">Eliminar</button>`
          : "";

      return `
            <tr>
                <td>${movement.id}</td>
                <td>${product ? product.name : "Producto Eliminado"}</td>
                <td><span class="badge ${badgeClass}">${typeLabel}</span></td>
                <td>${movement.quantity}</td>
                <td>${date}</td>
                <td>${deleteBtn}</td>
            </tr>
        `;
    })
    .join("");
}

// ===================== ESTADÍSTICAS =====================

/**
 * Refresca las estadísticas
 */
function refreshEstadisticas() {
  const container = document.getElementById("estadisticasContent");

  // Productos con bajo stock
  const lowStockProducts = data.products
    .filter((p) => p.stock < 5)
    .sort((a, b) => a.stock - b.stock);

  // Producto con más movimientos
  const movementCounts = {};
  data.movements.forEach((m) => {
    movementCounts[m.productId] = (movementCounts[m.productId] || 0) + 1;
  });

  let topMostMovedProduct = null;
  let maxMovements = 0;
  for (const [productId, count] of Object.entries(movementCounts)) {
    if (count > maxMovements) {
      maxMovements = count;
      topMostMovedProduct = data.products.find(
        (p) => p.id === parseInt(productId),
      );
    }
  }

  // Total de entradas y salidas
  const totalEntradas = data.movements
    .filter((m) => m.type === "entrada")
    .reduce((sum, m) => sum + m.quantity, 0);
  const totalSalidas = data.movements
    .filter((m) => m.type === "salida")
    .reduce((sum, m) => sum + m.quantity, 0);

  container.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card success">
                <h3>Total Entradas</h3>
                <div class="stat-value">${totalEntradas} unidades</div>
            </div>
            <div class="stat-card warning">
                <h3>Total Salidas</h3>
                <div class="stat-value">${totalSalidas} unidades</div>
            </div>
            <div class="stat-card">
                <h3>Diferencia Neta</h3>
                <div class="stat-value">${totalEntradas - totalSalidas} unidades</div>
            </div>
        </div>

        <h2 style="margin-top: 30px; margin-bottom: 20px;">Productos con Bajo Stock (< 5 unidades)</h2>
        ${
          lowStockProducts.length > 0
            ? `
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Stock</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${lowStockProducts
                          .map((p) => {
                            const category = data.categories.find(
                              (c) => c.id === p.categoryId,
                            );
                            return `
                                <tr>
                                    <td>${p.name}</td>
                                    <td>${category ? category.name : "-"}</td>
                                    <td><span class="text-danger">${p.stock}</span></td>
                                    <td>$${p.price.toFixed(2)}</td>
                                </tr>
                            `;
                          })
                          .join("")}
                    </tbody>
                </table>
            </div>
        `
            : '<div class="empty-state"><p>Excelente, todos los productos tienen stock suficiente</p></div>'
        }

        <h2 style="margin-top: 30px; margin-bottom: 20px;">Producto Más Activo</h2>
        ${
          topMostMovedProduct
            ? `
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                <p><strong>Producto:</strong> ${topMostMovedProduct.name}</p>
                <p><strong>Movimientos:</strong> ${maxMovements}</p>
                <p><strong>Stock Actual:</strong> ${topMostMovedProduct.stock}</p>
                <p><strong>Precio:</strong> $${topMostMovedProduct.price.toFixed(2)}</p>
            </div>
        `
            : '<div class="empty-state"><p>No hay datos de movimientos</p></div>'
        }
    `;
}

// ===================== UTILIDADES =====================

/**
 * Limpia todas las secciones
 */
function clearSections() {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });
}

// ===================== INICIALIZACIÓN =====================

// Cargar datos al iniciar (si ya hay sesión)
loadFromLocalStorage();
