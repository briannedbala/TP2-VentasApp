Descripción del proyecto
Usted ha sido contratado para desarrollar una Aplicación Web que respalde la gestión de un sistema de ventas. La empresa requiere llevar un control detallado de proveedores, clientes, productos y ventas.

Requisitos del sistema:
Proveedor: debe registrarse con RUT, nombre, dirección, teléfono y página web.

Cliente: posee RUT, nombre, dirección (compuesta por calle, número, comuna y ciudad) y uno o más teléfonos de contacto.

Producto: cada producto cuenta con un ID único, nombre, precio actual, stock disponible y nombre del proveedor. Los productos están organizados por categorías y cada uno pertenece exclusivamente a una categoría.

Categoría: tiene un ID, nombre y descripción.

Venta: por motivos contables, cada venta debe registrar un ID, fecha, cliente, descuento aplicado y monto final. Además, se debe almacenar el precio del producto al momento de la venta, la cantidad vendida y el subtotal correspondiente por producto.

Actividad 
Como parte del proyecto, cada estudiante deberá implementar al menos un endpoint relacionado con el módulo de ventas. Por ejemplo, puede desarrollar un endpoint que permita registrar una nueva venta, incluyendo los productos vendidos, sus cantidades, precios al momento de la venta y cálculo automático del total con descuento.