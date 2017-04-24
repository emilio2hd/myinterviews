CKEDITOR.editorConfig = function( config ) {
  config.toolbar = [
    { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
    { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] },
    { name: 'styles', items: [ 'Styles', 'Format' ] },
    { name: 'links', items: [ 'Link', 'Unlink' ] },
    { name: 'insert', items: [ 'Table', 'HorizontalRule' ] },
    { name: 'tools', items: [ 'Maximize' ] },
    { name: 'document', items: [ 'Source' ] },
    { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent' ] }
  ];
};