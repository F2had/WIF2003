$(document).ready(function () {

  $("#profile-form").submit(function (event) {
    event.preventDefault();
    var form = $(this)[0];
    var formData = new FormData(form);
    formData.append('update', true);
    $.ajax({
      method: "POST",
      url: "includes/edit-profile.inc.php?",
      data: formData,
      dataType: "JSON",
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);


        if (!response.password) {

          Swal.fire({
            icon: 'error',
            title: "Incorrect Password"
          })
        }
        else {

          if (!response.changed) {
            
            Swal.fire({
              icon: 'error',
              title: "Nothing Changed"
            })
              return ;
          } else {
            if (!response.valid_email) {
              Swal.fire({
                icon: 'error',
                title: "Invalid e-mail"
              })
            }
            else {
              if (response.exist) {
                Swal.fire({
                  icon: 'error',
                  title: "E-mail already exist"
                })
              }
            }


            if (!response.valid_name) {
              Swal.fire({
                icon: 'error',
                title: "Invalid Name",
                text: "Only A-Z a-z allowed"
              })
            }

            if (response.newImg) {

              if (!response.valid_ext) {
                Swal.fire({
                  icon: 'error',
                  title: "Incorrect Extension",
                  text: '{gif, png, jpeg or jpg Only!}'
                })
              } else {

                if (!response.valid_size) {
                  Swal.fire({
                    icon: 'error',
                    title: "Size should be less than 2MB"
                  })
                }
              }
            }

          }

          if (!response.valid_phone) {
            Swal.fire({
              icon: 'error',
              title: "Invalid phone number e.g. 01234567213"
            })
          }

          if (!response.valid_occupation) {
            Swal.fire({
              icon: 'error',
              title: "Occupation should be A-Z a-z e.g. Web Developer"
            })
          }else {

          }



          if (response.name_changed || response.phone_changed || response.occupation_changed || response.email_changed || response.img_changed) {
            Swal.fire({
              icon: 'success',
              title: "Profile Updated!"
            })
          }
        }


      },
    });
  });


  $("#password-form").submit(function (event) {
    event.preventDefault();
    var form = $(this)[0];
    var formData = new FormData(form);
    formData.append('reset', true);

    $.ajax({
      method: "POST",
      url: "includes/edit-profile.inc.php?",
      data: formData,
      dataType: "JSON",
      processData: false,
      contentType: false,
      success: function (response, _textStatus, _jqXHR) {

        if (!response.password) {
          Swal.fire({
            icon: 'error',
            title: "Incorrect Password",
          })
        } else {
          if (!response.password_match) {
            Swal.fire({
              icon: 'error',
              title: "Password Doesn't Match",
            })
          }
        }




        if (response.password && response.password_match && response.password_changed) {
          Swal.fire({
            title: 'Password Changed',
            icon: 'success',
          })

        }


      },
      error: function (jqXHR, textStatus, errorThrown, _exception) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      },
    });
  });





  $("#delete-form").submit(function (event) {
    event.preventDefault();
    var form = $(this)[0];
    var formData = new FormData(form);
    formData.append('delete', true);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover your account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: 'red',
      cancelButtonColor: 'green'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          method: "POST",
          url: "includes/edit-profile.inc.php?",
          data: formData,
          dataType: "JSON",
          contentType: false,
          processData: false,
          success: function (response) {
            console.log(response);

            if (!response.password) {
              $('#delete-input').addClass('error2');
              $('#delete-input').after('<span class="err2"> Incorrect Password</span>');
            }

            if (response.deleted) {
              window.location = "logout.php?deleted=" + response.deleted;
            }

          },

        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Thank you for keep giving'
        )
      }
    })

  });


  $('#home-tab').click(function () {
    $('#home').show('slow');
    $('#profile').hide('slow');
    $('#password').hide('slow');
    $('#delete').hide('slow');
  });

  $('#profile-tab').click(function () {
    $('#profile').show('slow');
    $('#home').hide('slow');
    $('#password').hide('slow');
    $('#delete').hide('slow');
  });

  $('#password-tab').click(function () {
    $('#password').show('slow');
    $('#home').hide('slow');
    $('#profile').hide('slow');
    $('#delete').hide('slow');
  });

  $('#delete-tab').click(function () {
    $('#delete').show('slow');
    $('#home').hide('slow');
    $('#profile').hide('slow');
    $('#password').hide('slow');
  });

});