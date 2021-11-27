import { DialogComponent } from './dialog.component';
import { LoadingComponent } from './loading.component';
import { ToastComponent } from './toast.component';
/* eslint-disable spaced-comment */
/// <reference types="cypress" />

const loadingComponent = new LoadingComponent();
const toastComponent = new ToastComponent();
const dialogComponent = new DialogComponent();

export class TaskPage {
  #textNoTask = 'Nenhuma tarefa foi encontrada.';

  inputDescription() {
    return cy.get('#description');
  }

  btnRegister() {
    return cy.get('.formgroup-inline > .p-button').first();
  }

  btnRemoveAll() {
    return cy.get('#btnRemoveAllTasks');
  }

  create(text: string) {
    this.inputDescription().type(text);
    this.btnRegister().click();
    loadingComponent.loading();
    toastComponent.toastSuccess();
  }

  btnEdit() {
    return cy.get('.p-button-info').first();
  }

  removeAllTasks() {
    loadingComponent.loading();
    cy.get('td').then(element => {
      cy.log(element[0].textContent.toString());
      if (element[0].textContent !== this.#textNoTask) {
        this.btnRemoveAll().should('be.visible');
        this.btnRemoveAll().click();
        dialogComponent.isVisible().should('be.visible');
        dialogComponent.btnYes().click();
        dialogComponent.isVisible().should('not.be.visible');
        loadingComponent.loading();
        toastComponent.toastSuccess();
        this.btnRemoveAll().should('not.exist');
      }
    });
  }

  btnFinish() {
    return cy.get(':nth-child(5) > .p-button-success').first();
  }

  btnDelete() {
    return cy.get(':nth-child(5) > .p-button-danger').first();
  }

  tableActions() {
    return cy.get(':nth-child(5)').first();
  }

  createRequiredField() {
    return cy.get('.text-right > .p-error');
  }

  updateRequiredField() {
    return cy.get('.p-error');
  }

  taskNotFound() {
    return cy.get('td').should('have.text', this.#textNoTask);
  }

  selectCheckbox() {
    return cy.get('.p-checkbox-box').first();
  }

  btnFinishSelected() {
    return cy.get('#btnFinishSelected');
  }

  btnSelectAll() {
    return cy.get('.p-button-warning').first();
  }

  btnDeselectAll() {
    return cy.get('.p-3 > :nth-child(5)').first();
  }

  taskActive() {
    return cy
      .get(':nth-child(4) > .p-badge')
      .first()
      .should('have.text', 'Ativo');
  }

  taskFinished() {
    return cy
      .get(':nth-child(4) > .p-badge')
      .first()
      .should('have.text', 'Finalizado');
  }

  sortByTask() {
    return cy.get('tr > .p-highlight').first();
  }

  checkSortByTask(text: string) {
    return cy
      .get('.p-datatable-tbody > tr > :nth-child(2)')
      .first()
      .should('have.text', `${text}Ver tarefa`);
  }

  filterByActive() {
    return cy
      .get(
        '.p-tabmenu-nav > :nth-child(2) > .p-menuitem-link > .p-menuitem-text'
      )
      .should('have.text', 'Ativos');
  }

  filterByFinished() {
    return cy
      .get(
        '.p-tabmenu-nav > :nth-child(3) > .p-menuitem-link > .p-menuitem-text'
      )
      .should('have.text', 'Finalizados');
  }
}
