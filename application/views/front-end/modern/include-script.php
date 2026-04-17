<script src="<?= base_url("assets/front_end/modern/js/eshop-bundle-js.js") ?>"></script>

<script src="<?= base_url("assets/front_end/modern/js/eshop-bundle-top-js.js") ?>" type="module"></script>
<!-- lazy-load js -->
<script src="<?= base_url('assets/front_end/modern/js/lazyload.min.js') ?>"></script>

<!-- Firebase.js -->
<script src="<?= base_url('assets/front_end/modern/js/firebase-app.js') ?>"></script>
<script src="<?= base_url('assets/front_end/modern/js/firebase-auth.js') ?>"></script>
<script src="<?= base_url('assets/front_end/modern/js/firebase-firestore.js') ?>"></script>
<script src="<?= base_url('firebase-config.js') ?>"></script>

<!-- intlTelInput -->


<!-- lottie animation js -->
<script
    src="<?= base_url('assets/front_end/modern/js/unpkg.com_@lottiefiles_lottie-player@2.0.2_dist_lottie-player.js') ?>">
</script>

<!-- Custom Js -->
<!-- <script type="module" src="<?//= base_url('assets/front_end/modern/js/custom.js') ?>"></script> -->
<script>
const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
})
</script>

<?php if ($this->session->flashdata('message')) { ?>
<script>
Toast.fire({
    icon: '<?= $this->session->flashdata('message_type'); ?>',
    title: "<?= $this->session->flashdata('message'); ?>"
});
</script>
<?php } ?>