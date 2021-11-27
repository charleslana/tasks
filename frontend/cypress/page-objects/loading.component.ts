/* eslint-disable spaced-comment */
/// <reference types="cypress" />

export class LoadingComponent {
  isLoading() {
    return cy.get('.p-blockui').first();
  }

  loading() {
    this.isLoading().should('be.visible');
    this.isLoading().should('not.exist');
  }
}
