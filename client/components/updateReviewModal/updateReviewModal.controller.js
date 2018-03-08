import angular from 'angular';

export class UpdateReviewController {
  /*@ngInject*/
  constructor($uibModalInstance, Review, review) {
    this.Review = Review;
    this.$uibModalInstance = $uibModalInstance;
    this.review = review;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    this.Review.updateReview(this.review)
      .then(() => {
        this.formInfo = 'Review successfully updated!';
      })
      .catch(err => {
        console.error(err);
        this.formError = err.toString();
      });
  }
}

export default angular.module('comp3705App.updateReviewModal', [])
  .controller('updateReviewController', UpdateReviewController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
