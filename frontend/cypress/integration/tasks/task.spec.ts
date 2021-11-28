import { DialogComponent } from '../../page-objects/dialog.component';
import { LoadingComponent } from '../../page-objects/loading.component';
import { Random } from '../../page-objects/random';
import { TaskPage } from '../../page-objects/task.page';
import { ToastComponent } from '../../page-objects/toast.component';
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

const taskPage = new TaskPage();
const loadingComponent = new LoadingComponent();
const toastComponent = new ToastComponent();
const dialogComponent = new DialogComponent();
let text: string;
const fixedText = 'Um texto';

context('Módulo Tarefas', () => {
  beforeEach(() => {
    cy.visit(taskPage.url);
    text = Random.generateText();
  });

  describe('Testes', () => {
    it('Verificar se o texto randômico é o esperado para a descrição da tarefa.', () => {
      expect(text).to.equal(text);
    });

    it('Verificar o carregamento das tarefas.', () => {
      loadingComponent.loading();
    });

    it('Criar a tarefa, campo descrição obrigatório.', () => {
      loadingComponent.loading();
      taskPage.inputDescription().type(' ');
      taskPage.btnRegister().click();
      taskPage.createRequiredField().should('be.visible');
    });

    it('Criar a tarefa com sucesso', () => {
      loadingComponent.loading();
      taskPage.create(text);
    });

    it('Criar a tarefa com uma descrição existente.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.create(text, false);
      dialogComponent.alertDialog().should('be.visible');
    });

    it('Criar a tarefa e validar o contador', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.countTasksTotal().should('have.text', 1);
    });

    it('Remover todas as tarefas, na confirmação acionar o botão Não.', () => {
      loadingComponent.loading();
      taskPage.create(text);
      taskPage.btnRemoveAll().should('be.visible');
      taskPage.btnRemoveAll().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnNo().click();
      dialogComponent.isVisible().should('not.exist');
    });

    it('Remover todas as tarefas, na confirmação acionar o botão Sim.', () => {
      taskPage.removeAllTasks();
    });

    it('Editar a tarefa, campo descrição deve vir preenchido.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.btnEdit().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.inputEditDescription().should('have.value', text);
    });

    it('Editar a tarefa, campo descrição obrigatório.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.btnEdit().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.inputEditDescription().clear().type(' ');
      dialogComponent.btnUpdate().click();
      taskPage.updateRequiredField().should('be.visible');
    });

    it('Editar a tarefa e confirmar com sucesso.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.btnEdit().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.inputEditDescription().clear().type(`${text} atualizado`);
      dialogComponent.btnUpdate().click();
      dialogComponent.isVisible().should('not.be.visible');
      loadingComponent.loading();
      toastComponent.toastSuccess();
    });

    it('Editar a tarefa e Cancelar.', () => {
      loadingComponent.loading();
      taskPage.create(text);
      taskPage.btnEdit().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnCancel().click();
      dialogComponent.isVisible().should('not.exist');
    });

    it('Editar a tarefa com uma descrição existente.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.create(fixedText);
      taskPage.btnEdit().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.inputEditDescription().clear().type(fixedText);
      dialogComponent.btnUpdate().click();
      dialogComponent.alertDialog().should('be.visible');
    });

    it('Finalizar a tarefa, na confirmação acionar o botão Não.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.btnFinish().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnNo().click();
      dialogComponent.isVisible().should('not.exist');
    });

    it('Finalizar a tarefa, na confirmação acionar o botão Sim.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.btnFinish().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnYes().click();
      dialogComponent.isVisible().should('not.be.visible');
      loadingComponent.loading();
      toastComponent.toastSuccess();
      taskPage.tableActions().should('have.length', '1');
    });

    it('Excluir a tarefa, na confirmação acionar o botão Não.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.btnDelete().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnNo().click();
      dialogComponent.isVisible().should('not.exist');
    });

    it('Excluir a tarefa, na confirmação acionar o botão Sim.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.btnDelete().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnYes().click();
      dialogComponent.isVisible().should('not.be.visible');
      loadingComponent.loading();
      toastComponent.toastSuccess();
      taskPage.taskNotFound();
    });

    it('Selecionar o checkbox da lista de tarefas e desmarcar, o botão selecionar todas deve aparecer quando marcado e desaparecer quando desmarcado.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.selectCheckbox().click();
      taskPage.btnFinishSelected().should('be.visible');
      taskPage.selectCheckbox().click();
      taskPage.btnFinishSelected().should('not.exist');
    });

    it('Selecionar todas e desmarcar todas, o botão selecionar todas deve aparecer quando marcado e desaparecer quando desmarcado.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.btnSelectAll().click();
      taskPage.btnFinishSelected().should('be.visible');
      taskPage.btnDeselectAll().click();
      taskPage.btnFinishSelected().should('not.exist');
    });

    it('Selecionar todas e finalizar todas, na confirmação acionar o botão Não.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.btnSelectAll().click();
      taskPage.btnFinishSelected().should('be.visible');
      taskPage.btnFinishSelected().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnNo().click();
      dialogComponent.isVisible().should('not.exist');
    });

    it('Selecionar todas e finalizar todas, na confirmação acionar o botão Sim.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.btnSelectAll().click();
      taskPage.btnFinishSelected().should('be.visible');
      taskPage.btnFinishSelected().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnYes().click();
      dialogComponent.isVisible().should('not.be.visible');
      loadingComponent.loading();
      toastComponent.toastSuccess();
      taskPage.taskFinished();
    });

    it('Ordernar por tarefa em ordem decrescente.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.create(fixedText);
      taskPage.sortByTask().click();
      taskPage.checkFirstText(fixedText);
    });

    it('Filtrar por tarefas ativas.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.filterByActive().click();
      taskPage.taskActive();
    });

    it('Filtrar por tarefas finalizadas.', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.filterByFinished().click();
      taskPage.taskNotFound();
    });

    it('Paginar tarefas', () => {
      taskPage.removeAllTasks();
      taskPage.create('1');
      taskPage.create('2');
      taskPage.create('3');
      taskPage.create('4');
      taskPage.create('5');
      taskPage.create('6');
      taskPage.openSelectPage().click();
      taskPage.choseSelectPage().click();
      taskPage.selectEndPage().click();
      taskPage.checkFirstText('6');
    });

    it('Ver tarefa', () => {
      taskPage.removeAllTasks();
      taskPage.create(text);
      taskPage.linkShowTask().click();
      taskPage.checkUrlTaskDetails();
      loadingComponent.loading();
      taskPage.titleTaskDetails().should('have.text', text);
    });
  });
});
