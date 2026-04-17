<main>
    <section class="container py-5">
        <div class="row">
            <div class="col-md-3 myaccount-navigation py-3">
                <?php $this->load->view('front-end/' . THEME . '/pages/my-account-sidebar') ?>
            </div>
            <div class="col-md-9 py-3 padding-16-30">
                <h4 class="section-title mb-2"><?= label('address', 'Address') ?></h4>
                <form action="<?= base_url('my-account/add-address') ?>" method="POST" id="add-address-form">
                    <div class="row">
                        <div class="mb-3 col-md-12">
                            <label for="address_name" class="form-label"><?= label('name', 'Name') ?> <sup
                                    class="text-danger fw-bold">*</sup></label>
                            <input type="text" class="form-control" id="address_name" name="name"
                                placeholder="<?= !empty($this->lang->line('name')) ? $this->lang->line('name') : 'Name' ?>">
                        </div>
                        <div class="mb-3 col-md-6">
                            <label for="mobile_number" class="form-label"><?= label('mobile_number', 'Mobile Number') ?>
                                <sup class="text-danger fw-bold">*</sup></label>
                            <input type="number" class="form-control" id="mobile_number" name="mobile"
                                placeholder="<?= !empty($this->lang->line('mobile_number')) ? $this->lang->line('mobile_number') : 'mobile_number' ?>">
                        </div>
                        <div class="mb-3 col-md-6">
                            <label for="alternate_mobile"
                                class="form-label"><?= label('alternate_mobile', 'Alternate Mobile') ?></label>
                            <input type="number" class="form-control" id="alternate_mobile" name="alternate_mobile"
                                placeholder="<?= !empty($this->lang->line('alternate_mobile')) ? $this->lang->line('alternate_mobile') : 'Alternate_mobile' ?>">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="address"><?= label('address', 'Address') ?> <sup
                                    class="text-danger fw-bold">*</sup></label>
                            <textarea class="form-control" name="address" id="address" rows="3"
                                placeholder="<?= !empty($this->lang->line('address')) ? $this->lang->line('address') : 'Address' ?>"></textarea>
                        </div>
                        <div class="mb-3 col-md-12">
                            <label for="country" class="form-label"><?= label('country', 'Country') ?> <sup
                                    class="text-danger fw-bold">*</sup></label>
                            <input type="text" class="form-control" id="country" name="country"
                                placeholder="<?= !empty($this->lang->line('country')) ? $this->lang->line('country') : 'Country' ?>">
                        </div>
                        <div class="mb-3 col-md-12">
                            <label for="state" class="form-label"><?= label('state', 'State') ?> <sup
                                    class="text-danger fw-bold">*</sup></label>
                            <input type="text" class="form-control" id="state" name="state"
                                placeholder="<?= !empty($this->lang->line('state')) ? $this->lang->line('state') : 'State' ?>">
                        </div>
                        <div class="row">
                            <!-- City -->
                            <div class="col-12 city">
                                <div class="mb-3">
                                    <label for="city" class="form-label">
                                        <!-- <?= !empty($this->lang->line('city')) ? $this->lang->line('city') : 'City' ?> -->
                                          <?= label('city', 'City') ?> <sup class="text-danger fw-bold">*</sup>
                                    </label>

                                    <select class="form-select shadow-none" name="city_id" id="city">
                                        <option value="">
                                            <?= !empty($this->lang->line('select_city')) ? $this->lang->line('select_city') : 'Select City' ?>
                                        </option>
                                        <?php foreach ($cities as $row) { ?>
                                            <option value="<?= $row['id'] ?>"><?= $row['name'] ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                            </div>

                            <!-- Area -->
                            <div class="col-12 area">
                                <div class="mb-3">
                                    <label for="area" class="form-label">
                                        <?= label('area', 'Area') ?> <sup class="text-danger fw-bold">*</sup>
                                    </label>

                                    <input type="text" class="form-control shadow-none" id="area"
                                        name="general_area_name"
                                        placeholder="<?= !empty($this->lang->line('area')) ? $this->lang->line('area') : 'Area Name' ?>">
                                </div>
                            </div>
                        </div>
                        <div class="mb-3 col-md-12 pincode">
                            <label for="pincode"
                                class="control-label"><?= !empty($this->lang->line('pincode')) ? $this->lang->line('pincode') : 'Zipcode' ?></label>
                            <select name="pincode" id="pincode" class="form-control">
                                <option value="">
                                    <?= !empty($this->lang->line('select_zipcode')) ? $this->lang->line('select_zipcode') : '--Select Zipcode--' ?>
                                </option>
                            </select>
                        </div>
                        <div class="col-md-12 form-group city_name d-none">
                            <label for="city"
                                class="control-label"><?= !empty($this->lang->line('city')) ? $this->lang->line('city') : 'City Name' ?></label>
                            <input type="text" class="form-control " id="city_name" name="city_name"
                                placeholder="City" />
                        </div>
                        <div class="col-md-12 form-group area_name d-none">
                            <label for="area" class="control-label">Area</label>
                            <input type="text" class="form-control " id="area_name" name="area_name"
                                placeholder="Area Name" />
                        </div>

                        <div class="col-md-12 form-group pincode_name d-none">
                            <label for="area" class="control-label">Pincode</label>
                            <input type="text" class="form-control " id="pincode_name" name="pincode_name"
                                placeholder="Zipcode" />
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 form-group">
                            <label for="country"
                                class="control-label"><?= !empty($this->lang->line('type')) ? $this->lang->line('type') : 'Type : ' ?></label>
                            <div class="form-check form-check-inline">
                                <input type="radio" class="form-check-input" name="type" id="home" value="home" />
                                <label for="home"
                                    class="form-check-label text-dark"><?= !empty($this->lang->line('home')) ? $this->lang->line('home') : 'Home' ?></label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input type="radio" class="form-check-input" name="type" id="office" value="office"
                                    placeholder="Office" />
                                <label for="office"
                                    class="form-check-label text-dark"><?= !empty($this->lang->line('office')) ? $this->lang->line('office') : 'Office' ?></label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input type="radio" class="form-check-input" name="type" id="other" value="other"
                                    placeholder="Other" />
                                <label for="other"
                                    class="form-check-label text-dark"><?= !empty($this->lang->line('other')) ? $this->lang->line('other') : 'Other' ?></label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" id="save-address-submit-btn"
                        value="Save"><?= label('save_address', 'Save Address') ?></button>
                    <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                        <div id="save-address-result"></div>
                    </div>
                </form>
            </div>
            <div>
                <table id="address_list_table" class='table-striped' data-toggle="table"
                    data-url="<?= base_url('my-account/get-address-list') ?>" data-click-to-select="true"
                    data-side-pagination="server" data-pagination="true" data-page-list="[5, 10, 20, 50, 100, 200]"
                    data-search="true" data-show-columns="true" data-show-refresh="true" data-trim-on-search="false"
                    data-sort-name="id" data-sort-order="desc" data-mobile-responsive="true" data-toolbar=""
                    data-show-export="true" data-maintain-selected="true" data-export-types='["txt","excel"]'
                    data-export-options='{"fileName": "address-list", "ignoreColumn": ["operate"]}'
                    data-query-params="queryParams">
                    <thead>
                        <tr>
                            <th data-field="id" data-sortable="true">ID</th>
                            <th data-field="name" data-sortable="false">
                                <?= !empty($this->lang->line('name')) ? $this->lang->line('name') : 'Name' ?>
                            </th>
                            <th data-field="type" data-sortable="false" class="col-md-5">
                                <?= !empty($this->lang->line('type')) ? $this->lang->line('type') : 'Type' ?>
                            </th>
                            <th data-field="mobile" data-sortable="false">
                                <?= !empty($this->lang->line('mobile_number')) ? $this->lang->line('mobile_number') : 'Mobile' ?>
                            </th>
                            <th data-field="alternate_mobile" data-sortable="false">
                                <?= !empty($this->lang->line('alternate_mobile')) ? $this->lang->line('alternate_mobile') : 'Alternate Mobile' ?>
                            </th>
                            <th data-field="address" data-sortable="false">
                                <?= !empty($this->lang->line('address')) ? $this->lang->line('address') : 'Address' ?>
                            </th>
                            <th data-field="area" data-sortable="false">
                                <?= !empty($this->lang->line('area')) ? $this->lang->line('area') : 'Area' ?>
                            </th>
                            <th data-field="city" data-sortable="false">
                                <?= !empty($this->lang->line('city')) ? $this->lang->line('city') : 'City' ?>
                            </th>
                            <th data-field="state" data-sortable="false">
                                <?= !empty($this->lang->line('state')) ? $this->lang->line('state') : 'State' ?>
                            </th>
                            <th data-field="pincode" data-sortable="false">
                                <?= !empty($this->lang->line('pincode')) ? $this->lang->line('pincode') : 'Pincode' ?>
                            </th>
                            <th data-field="country" data-sortable="false">
                                <?= !empty($this->lang->line('country')) ? $this->lang->line('country') : 'Country' ?>
                            </th>
                            <th data-field="action" data-sortable="true">
                                <?= !empty($this->lang->line('action')) ? $this->lang->line('action') : 'Action' ?>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </section>

    <!-- address edit modal -->
    <div class="modal fade" data-bs-keyboard="false" tabindex="-1" id="address-modal" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header border-bottom-0 pb-0">
                    <h5 class="modal-title fw-bold" id="staticBackdropLabel"><?= label('edit_address', 'Edit Address') ?></h5>
                    <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <form action="<?= base_url('my-account/edit-address') ?>" method="POST" id="edit-address-form">
                        <input type="hidden" name="id" id="address_id" value="" />
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="edit_name" class="form-label fw-semibold small text-uppercase fw-bold"><?= label('name', 'Name') ?> <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control shadow-none" id="edit_name" name="name" placeholder="Enter Full Name" />
                            </div>
                            <div class="col-md-6">
                                <label for="edit_mobile" class="form-label fw-semibold small text-uppercase fw-bold"><?= label('mobile_number', 'Mobile Number') ?> <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control shadow-none" id="edit_mobile" name="mobile" placeholder="Enter Mobile Number" />
                            </div>
                            <div class="col-12">
                                <label for="edit_address" class="form-label fw-semibold small text-uppercase fw-bold"><?= label('address', 'Address') ?> <sup class="text-danger">*</sup></label>
                                <textarea class="form-control shadow-none" name="address" id="edit_address" rows="2" placeholder="Enter Complete Address"></textarea>
                            </div>

                            <!-- City -->
                            <div class="col-md-6 edit_city">
                                <label for="edit_city" class="form-label fw-semibold small text-uppercase fw-bold"><?= label('city', 'City') ?> <sup class="text-danger">*</sup></label>
                                <select name="city_id" id="edit_city" class="form-select shadow-none">
                                    <option value=""><?= label('select_city', '--Select City--') ?></option>
                                    <option value="0"><?= label('other', 'Other') ?></option>
                                    <?php foreach ($cities as $row) { ?>
                                        <option value="<?= $row['id'] ?>"><?= $row['name'] ?></option>
                                    <?php } ?>
                                </select>
                            </div>

                            <div class="col-md-6 other_city d-none">
                                <label for="other_city_value" class="form-label fw-semibold small text-uppercase fw-bold"><?= label('city_name', 'City Name') ?></label>
                                <input type="text" class="form-control shadow-none" id="other_city_value" name="other_city" placeholder="Enter City Name" />
                            </div>

                            <!-- Area -->
                            <div class="col-md-6 area">
                                <label for="edit_area" class="form-label fw-semibold small text-uppercase fw-bold"><?= label('area', 'Area') ?> <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control shadow-none" id="edit_area" name="edit_general_area_name" placeholder="Enter Area Name" />
                            </div>

                            <div class="col-md-6 other_areas d-none">
                                <label for="other_areas_value" class="form-label fw-semibold small text-uppercase fw-bold"><?= label('area_name', 'Area Name') ?></label>
                                <input type="text" class="form-control shadow-none" id="other_areas_value" name="other_areas" placeholder="Enter Area Name" />
                            </div>

                            <!-- Pincode -->
                            <div class="col-md-6 pincode">
                                <label for="edit_pincode" class="form-label fw-semibold small text-uppercase fw-bold"><?= label('pincode', 'Zipcode') ?></label>
                                <select name="pincode" id="edit_pincode" class="form-control form-select shadow-none">
                                    <option value=""><?= label('other', 'Other') ?></option>
                                </select>
                            </div>

                            <div class="col-md-6 other_pincode d-none">
                                <label for="other_pincode_value" class="form-label fw-semibold small text-uppercase fw-bold"><?= label('zipcode', 'Other Pincode') ?></label>
                                <input type="text" class="form-control shadow-none" id="other_pincode_value" name="pincode_name" placeholder="Enter Zipcode" />
                            </div>

                            <div class="col-md-6">
                                <label for="edit_state" class="form-label fw-semibold small text-uppercase fw-bold"><?= label('state', 'State') ?> <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control shadow-none" id="edit_state" name="state" placeholder="Enter State" />
                            </div>
                            <div class="col-md-6">
                                <label for="edit_country" class="form-label fw-semibold small text-uppercase fw-bold"><?= label('country', 'Country') ?> <sup class="text-danger">*</sup></label>
                                <input type="text" class="form-control shadow-none" name="country" id="edit_country" placeholder="Enter Country" />
                            </div>

                            <!-- Type -->
                            <div class="col-12 mt-4">
                                <label class="form-label fw-semibold small text-uppercase fw-bold mb-3 d-block"><?= label('address_type', 'Address Type') ?></label>
                                <div class="btn-group w-100" role="group" aria-label="Address Type Selection">
                                    <input type="radio" class="btn-check" name="type" id="edit_home" value="home" autocomplete="off">
                                    <label class="btn btn-outline-primary py-2" for="edit_home"><?= label('home', 'Home') ?></label>

                                    <input type="radio" class="btn-check" name="type" id="edit_office" value="office" autocomplete="off">
                                    <label class="btn btn-outline-primary py-2" for="edit_office"><?= label('office', 'Office') ?></label>

                                    <input type="radio" class="btn-check" name="type" id="edit_other" value="other" autocomplete="off">
                                    <label class="btn btn-outline-primary py-2" for="edit_other"><?= label('other', 'Other') ?></label>
                                </div>
                            </div>

                            <div class="col-12 mt-4">
                                <button type="submit" class="btn btn-primary w-100 py-3 fw-bold text-uppercase" id="edit-address-submit-btn"><?= label('save_address', 'Save Address') ?></button>
                            </div>
                            <div class="col-12 text-center">
                                <div id="edit-address-result"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
            </div>
        </div>
    </div>
</main>

