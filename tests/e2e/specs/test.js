describe('BCcampus OER Viewer', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('div', 'BCcampus OER Viewer')
    cy.get('button[title="Settings"]').click()
    cy.get('.v-dialog').should('be.visible')
  })
})
