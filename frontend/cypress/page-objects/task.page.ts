import { DialogComponent } from './dialog.component';
import { LoadingComponent } from './loading.component';
import { ToastComponent } from './toast.component';
/* eslint-disable spaced-comment */
/// <reference types="cypress" />

const loadingComponent = new LoadingComponent();
const toastComponent = new ToastComponent();
const dialogComponent = new DialogComponent();

export class TaskPage {
  textNoTask = 'Nenhuma tarefa foi encontrada.';
  url = '/';

  btnDelete() {
    return cy.get(':nth-child(5) > .p-button-danger').first();
  }

  btnDeselectAll() {
    return cy.get('.p-3 > :nth-child(5)').first();
  }

  btnEdit() {
    return cy.get('.p-button-info').first();
  }

  btnFinish() {
    return cy.get(':nth-child(5) > .p-button-success').first();
  }

  btnFinishSelected() {
    return cy.get('#btnFinishSelected');
  }

  btnRegister() {
    return cy.get('.formgroup-inline > .p-button').first();
  }

  btnRemoveAll() {
    return cy.get('#btnRemoveAllTasks');
  }

  btnSelectAll() {
    return cy.get('.p-button-warning').first();
  }

  checkFirstText(text: string) {
    return cy
      .get('.p-datatable-tbody > tr > :nth-child(2)')
      .first()
      .should('have.text', `${text}Ver tarefa`);
  }

  checkUrlTaskDetails() {
    return cy.url().should('contain', '/task');
  }

  choseSelectPage() {
    return cy.get('[aria-label="5"]').first();
  }

  create(text: string, isLoading = true) {
    this.inputDescription().type(text);
    this.btnRegister().click();
    if (isLoading) {
      loadingComponent.loading();
      toastComponent.toastSuccess();
    }
  }

  createRequiredField() {
    return cy.get('.text-right > .p-error');
  }

  countTasksTotal() {
    return cy.get(':nth-child(1) > h4 > .p-badge');
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

  inputDescription() {
    return cy.get('#description');
  }

  linkShowTask() {
    return cy.get('tr > :nth-child(2) > a').first();
  }

  openSelectPage() {
    return cy.get('.p-dropdown-trigger').first();
  }

  removeAllTasks() {
    loadingComponent.loading();
    cy.get('td').then(element => {
      if (element[0].textContent !== this.textNoTask) {
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

  selectCheckbox() {
    return cy.get('.p-checkbox-box').first();
  }

  selectEndPage() {
    return cy.get('.p-paginator-page-end').first();
  }

  sortByTask() {
    return cy.get('tr > .p-highlight').first();
  }

  tableActions() {
    return cy.get(':nth-child(5)').first();
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

  taskNotFound() {
    return cy.get('td').should('have.text', this.textNoTask);
  }

  titleTaskDetails() {
    return cy.get('h1').first();
  }

  updateRequiredField() {
    return cy.get('.p-error');
  }
}
