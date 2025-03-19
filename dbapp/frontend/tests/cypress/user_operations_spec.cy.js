describe('User Operations', () => {
  it('should add a user', () => {
    cy.visit('http://localhost:3000');

    // Select input fields based on placeholder attribute
    cy.get('input[placeholder="Name"]').type('Jane Doe');
    cy.get('input[placeholder="Class"]').type('10B');
    cy.get('input[placeholder="Seat"]').type('15');
    
    // Submit the form
    cy.get('button[type="submit"]').click();

    // Handle alert and verify success message
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User added successfully!');
    });
  });

  it('should view users', () => {
    cy.visit('http://localhost:3000');

    // Click the "View Users" button
    cy.contains('View Users').click();

    // Check if the user list is visible
    cy.get('ul.list-group').should('exist');
  });

  it('should delete a user', () => {
    cy.visit('http://localhost:3000');

    // Enter the User ID to delete in the input field
    cy.get('input[placeholder="Enter User ID to Delete"]').type('1'); // Use the appropriate user ID to delete

    // Click the "Delete User" button
    cy.get('button.btn.btn-danger').click();

    // Handle alert and verify success message
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User deleted successfully!');
    });

    // Verify that the user has been deleted (this will depend on your UI and how it handles deleted users)
    // For example, you might check if the user list no longer contains the deleted user's ID
    cy.get('ul.list-group').should('not.contain', '1'); // Ensure user with ID 1 is no longer in the list
  });
});
