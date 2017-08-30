function onSignIn(googleUser) {

      var profile = googleUser.getBasicProfile();

      var id=profile.getId();

      var name=profile.getName();

      var img=profile.getImageUrl();

      var email=profile.getEmail();

      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.

      console.log('Name: ' + profile.getName());

      console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    profile=JSON.stringify([id,name,img,email]);
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST","verify.php",true);
    xmlhttp.send(profile);
    window.location='index.php';
}
