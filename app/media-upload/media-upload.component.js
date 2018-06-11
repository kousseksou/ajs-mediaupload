'use strict';

angular.
  module('mediaUpload').
  component('mediaUpload', {
    templateUrl: 'media-upload/media-upload.template.html',
    controller: ['$scope', '$element',
      function MediaUploadController($scope, $element) {
		  var self = this;

		  self.dataSubmit = null;

		  self.uploadInProgress = false;
		  self.hash = false;

		  self.startUpload = function() {
			  $scope.$apply(function() {
				  self.uploadInProgress = true;
				  self.hash = false;
			  });
		  };

		  self.doneUpload = function(mediaHash, error) {
			  $scope.$apply(function() {
				  self.uploadInProgress = false;
				  self.hash = mediaHash;
				  self.dataSubmit = null;

				  if (error) {
					  self.error = error;
				  }
			  });
		  };

		  self.progressUpload = function(loaded, total) {
			  $scope.$apply(function() {
				  self.uploadInProgress = true;
				  self.progress = parseInt(loaded / total * 100, 10);
			  });
		  };

		  self.cancelUpload = function()  {
			  if (self.dataSubmit) {
				  self.dataSubmit.abort();
				  self.dataSubmit = null;
			  }

			  $scope.$apply(function() {
				  self.uploadInProgress = true;
				  self.progress = 0;
			  });
		  };

		  self.fileUpload = function () {
			  $element.find("input.fileupload").fileupload({
				  dataType: "json",
				  url: "https://upload.wistia.com?project_id=j4q8zvu88k&access_token=75dbd0387ff5a4e0703f06aa71ab6a7bfe17975d2fd09ce982af6ba80b3b92b2",
				  add: function(e, data) {
					  self.startUpload();

					  self.dataSubmit = data.submit();
				  },
				  done: function(e, data) {

					  self.doneUpload(data.result.hashed_id);
				  },
				  fail: function(e, data) {
				  	  var error = data.textStatus === "error"
						  ? data.jqXHR.responseJSON.error
						  : null;
					  self.doneUpload(false, error);
				  },
				  progress: function(e, data) {
					  self.progressUpload(data.loaded, data.total);
				  }
			  });
		  };
      }
    ]
  });
