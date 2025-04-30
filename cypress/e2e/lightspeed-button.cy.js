describe('Lightspeed API button', () => {
  it('should click the button and receive a 200 response', () => {
    // Generate timestamp once per test run
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logFileName = `cypress/reports/api-test-${timestamp}.json`;
    
    cy.intercept('POST', 'http://127.0.0.1:8000/api/v1/test-call').as('apiCall');

    cy.visit('http://127.0.0.1:8000');

    cy.get('#apiButton').click();

    cy.wait('@apiCall').then((interception) => {
      // Handle potential missing response
      if (!interception.response) {
        cy.log('Error: No response received from server');
        const errorEntry = {
          timestamp: new Date().toISOString(),
          error: 'No API response',
          requestUrl: interception.request.url
        };
        cy.writeFile(logFileName, 
          JSON.stringify(errorEntry, null, 2) + '\n'
        );
        return;
      }

      const response = interception.response;
      
      // Handle success/error logging
      if (response.statusCode === 200) {
        cy.log('Success: Server returned 200');
      } else if (response.statusCode >= 400) {
        cy.log(`Error: Received status ${response.statusCode}`);
      }

      // Create log entry with safe property access
      const logEntry = {
        timestamp: new Date().toISOString(),
        url: interception.request.url, // Use request from interception instead of response
        status: response.statusCode,
        duration: response.duration,
        body: response.body || 'No response body'
      };

      // Append to log file
      cy.writeFile(logFileName, 
        JSON.stringify(logEntry, null, 2) + '\n'
      );

      expect(response.statusCode).to.eq(200);
    });
  });
});
