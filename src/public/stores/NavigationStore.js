import { observable, action } from 'mobx';

class NavigationStore {
  @observable previousPage = '/';
  @observable currentPage;
  @observable nextPage;

  @action
  setUrlState(previousPage, currentPage, nextPage) {
    this.previousPage = previousPage;
    this.currentPage = currentPage;
    this.nextPage = nextPage;
  }

  updateNavButtonUrl(currentPage, action) {
    switch (currentPage) {
      case '/amount':
        this.setUrlState('/', currentPage, '/personal-info');
        break;
      case '/personal-info':
        this.setUrlState('/amount', currentPage, '/payment-method');
        break;
      case '/payment-method':
        this.setUrlState('/personal-info', currentPage, '/review');
        break;
      case '/review':
        this.setUrlState('/payment-method', currentPage, '/success');
        break;
      default:
        this.setUrlState('/review', currentPage, '/');
        break;
    }
  }
}

export default new NavigationStore();
