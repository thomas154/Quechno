<?php
    session_start();
    unset($_SESSION['email']);
?>
<script>
    window.location="logout.php";
</script>