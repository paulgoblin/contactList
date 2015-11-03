(function($,LS) {
  'use strict'

  let contacts = LS.contacts ? JSON.parse(LS.contacts) : [];
  let editIndex;

  let init = () => {

    $('#add-btn').click(addContact);
    $('#list').on('click','.remove',removeContact);
    $('#list').on('click','.edit', populateModal);
    $('#saveContact').click(saveModalData)
    $('')

    drawContacts();

  }

  let addContact = (e) => {
    editIndex = contacts.length;
    $modalForm = $('.modal-body')
    $modalForm.find('#name').val('');
    $modalForm.find('#phone').val('');
    $modalForm.find('#email').val('');
    $modalForm.find('#address').val('');

    // draw and store
    drawContacts();
    storeContacts();

  }

  let removeContact = (e) => {
    //find entry and remove
    let entryIndex = $(e.target).closest('.entry').index();
    contacts.splice(entryIndex,1);

    //draw and store
    drawContacts();
    storeContacts();
  }

  let populateModal = (e) => {
    editIndex = $(e.target).closest('.entry').index();
    let $modalForm = $('.modal-body');
    let name = contacts[editIndex].name;
    let phone = contacts[editIndex].phone;
    let email = contacts[editIndex].email;
    let address = contacts[editIndex].address;
    $modalForm.find('#name').val(name);
    $modalForm.find('#phone').val(phone);
    $modalForm.find('#email').val(email);
    $modalForm.find('#address').val(address);
  }

  let saveModalData = () => {
    let entry = makeEntry($('.modal-body'));
    contacts.splice(editIndex,1,entry);
    drawContacts();
    storeContacts();
  }

  let makeEntry = ($form) => {
    let name = $form.find('#name').val();
    let email = $form.find('#email').val();
    let phone = $form.find('#phone').val();
    let address = $form.find('#address').val();

    let entry = {
      name: name,
      email: email,
      phone: phone,
      address: address
    };

    return entry;

  }

  let drawContacts = () => {
    let $listBody = $('#list').empty();
    $listBody.empty();

    if(contacts.length){
      $('thead').show();
    } else {
      $('thead').hide();
    }


    let listElements = contacts.map(function(contact) {
      let $tr = $('#sample').clone();
      $tr.removeAttr('id');
      $tr.addClass('entry');
      $tr.children('.name').text(contact.name);
      $tr.children('.email').text(contact.email);
      $tr.children('.phone').text(contact.phone);
      $tr.children('.address').text(contact.address);
      return $tr;
    })

    $listBody.append(listElements);

  };

  let storeContacts = () => {
    LS.contacts = JSON.stringify(contacts);
  }

  $(document).ready(init)

})(jQuery, localStorage)











