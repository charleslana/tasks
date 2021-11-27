/* eslint-disable spaced-comment */
/// <reference types="cypress" />

export class ToastComponent {
  success() {
    return cy.get('.p-toast-message-success').first();
  }

  isVisible() {
    return cy.get('.p-toast-message-content').first();
  }

  toastSuccess() {
    this.success().should('be.visible');
    this.btnClose().click();
    this.isVisible().should('not.be.visible');
  }

  btnClose() {
    return cy.get('.p-toast-icon-close-icon').first();
  }
}
