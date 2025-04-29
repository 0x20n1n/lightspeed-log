describe('Lightspeed API button', () => {
  it('should click the button and receive a 200 response', () => {
    cy.intercept('POST', 'http://127.0.0.1:8000/api/v1/test-call').as('apiCall');

    cy.visit('http://127.0.0.1:8000');

    cy.get('#apiButton').click();

    cy.wait('@apiCall').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      cy.log('Received 200 OK from API!');
    });
  });
});
