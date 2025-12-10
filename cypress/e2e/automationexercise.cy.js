describe('Registro, Login, Búsqueda y compra en AutomationExercise', () => {

  const email = "vasquezsr12@hotmail.com";
  const password = "P123456789";

  it('Crear usuario, cerrar sesión, iniciar sesión, buscar producto y comprar', () => {

    cy.visit('https://automationexercise.com');

    //REGISTRO
    cy.contains('Signup / Login').click();
    cy.get('[data-qa="signup-name"]').type('Santiago QA12');
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    //Datos del formulario de registro
    cy.get('#id_gender1').click();
    cy.get('[data-qa="password"]').type(password);
    cy.get('[data-qa="days"]').select('10');
    cy.get('[data-qa="months"]').select('April');
    cy.get('[data-qa="years"]').select('1998');

    cy.get('[data-qa="first_name"]').type('Santiago');
    cy.get('[data-qa="last_name"]').type('Vasquez');
    cy.get('[data-qa="address"]').type('Calle Falsa 123');
    cy.get('[data-qa="country"]').select('Canada');
    cy.get('[data-qa="state"]').type('Ontario');
    cy.get('[data-qa="city"]').type('Toronto');
    cy.get('[data-qa="zipcode"]').type('12345');
    cy.get('[data-qa="mobile_number"]').type('3001234567');

    cy.get('[data-qa="create-account"]').click();

    cy.contains('Account Created!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();

    //LOGOUT DESPUÉS DE CREAR LA CUENTA
    cy.contains('Logout', { timeout: 10000 }).should('be.visible').click();

    //LOGIN
    cy.contains('Signup / Login').click();
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password);
    cy.get('[data-qa="login-button"]').click();
    cy.contains('Logged in as').should('be.visible');

    //IR A PRODUCTS
    cy.contains('Products', { timeout: 15000 }).click();

    //BÚSQUEDA DE PRODUCTOS
    cy.get('#search_product', { timeout: 10000 }).type('Dress');
    cy.get('#submit_search').click();

    // Validación de resultados
    cy.contains('Searched Products').should('be.visible');
    cy.contains('Dress', { matchCase: false }).should('exist');

    //AGREGAR AL CARRITO
    cy.contains('Add to cart', { timeout: 15000 }).first().click({ force: true });
    cy.contains('View Cart').click();

    //CHECKOUT
    cy.contains('Proceed To Checkout').click();
    cy.contains('Place Order').click();

    cy.get('[data-qa="name-on-card"]').type('Santiago QA');
    cy.get('[data-qa="card-number"]').type('4242424242424242');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2030');
    cy.get('[data-qa="pay-button"]').click();

    cy.contains('Order Placed!').should('be.visible');

  });

});