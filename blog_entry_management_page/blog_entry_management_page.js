var entry_title_input_box = document.getElementsByClassName("entry_title_input_box")[0];

var entry_content_input_box = document.getElementsByClassName("entry_content_input_box")[0];

var entry_creation_status_popup = document.getElementsByClassName("entry_creation_status_popup")[0];

var complete_entry_creation_btn = document.getElementsByClassName("complete_entry_creation_btn")[0];

var cancel_entry_creation_btn = document.getElementsByClassName("cancel_entry_creation_btn")[0];

var blog_entry_selection_box = document.getElementsByClassName("blog_entry_selection_box")[0];

var edit_entry_btn = document.getElementsByClassName("edit_entry_btn")[0];

var delete_entry_btn = document.getElementsByClassName("delete_entry_btn")[0];

var entry_title_preview_and_editor_input_box = document.getElementsByClassName("entry_title_preview_and_editor_input_box")[0];

var entry_content_preview_and_editor_input_box = document.getElementsByClassName("entry_content_preview_and_editor_input_box")[0];

var cancel_management_btn = document.getElementsByClassName("cancel_management_btn")[0];

document.getElementsByClassName("home_btn")[0].addEventListener("click", OnHomeBtnClicked);

document.getElementsByClassName("create_entry_btn")[0].addEventListener("click", OnCreateEntryBtnClicked);

document.getElementsByClassName("manage_entries_btn")[0].addEventListener("click", OnManageEntriesBtnClicked);

complete_entry_creation_btn.addEventListener("click", OnCompleteEntryCreationBtnClicked);

cancel_entry_creation_btn.addEventListener("click", OnCancelEntryCreationBtnClicked);

blog_entry_selection_box.addEventListener("change", OnBlogEntrySelectionBoxChanged);

edit_entry_btn.addEventListener("click", OnEditEntryBtnClicked);

delete_entry_btn.addEventListener("click", OnDeleteEntryBtnClicked);

cancel_management_btn.addEventListener("click", OnCancelManagementBtnClicked);

SwitchPanels(0);

function OnHomeBtnClicked()
{
    window.location.href = "../index.html";
}

function OnCreateEntryBtnClicked()
{
    entry_creation_status_popup.setAttribute("display", "none");

    SwitchPanels(1);
}

function OnManageEntriesBtnClicked()
{
    InitBlogEntrySelectionBoxOptions();

    SwitchPanels(2);

    UpdateBlogEntryDetailsBoxContent();
}

function SwitchPanels(chosen_panel_index)
{
    if (chosen_panel_index == 0)
    {
        SetDivDisplayMode("entry_management_type_choice_panel", "flex");

        SetDivDisplayMode("create_entry_panel", "none");

        SetDivDisplayMode("manage_entries_panel", "none");
    }
    else if (chosen_panel_index == 1)
    {
        SetDivDisplayMode("entry_management_type_choice_panel", "none");

        SetDivDisplayMode("create_entry_panel", "flex");

        SetDivDisplayMode("manage_entries_panel", "none");
    }
    else if (chosen_panel_index == 2)
    {
        SetDivDisplayMode("entry_management_type_choice_panel", "none");

        SetDivDisplayMode("create_entry_panel", "none");

        SetDivDisplayMode("manage_entries_panel", "flex");
    }
}

function SetDivDisplayMode(div_class_name, div_display_mode)
{
    document.getElementsByClassName(div_class_name)[0].style["display"] = div_display_mode;
}

function OnCompleteEntryCreationBtnClicked()
{
    let blog_entries_arr = JSON.parse(localStorage.getItem("blog_entries_arr"));

    blog_entries_arr.push(new BlogEntry(entry_title_input_box.value, entry_content_input_box.value));

    localStorage.setItem("blog_entries_arr", JSON.stringify(blog_entries_arr));

    entry_creation_status_popup.innerHTML = "New blog post created successfully.";

    entry_creation_status_popup.setAttribute("display", "block");
}

function OnCancelEntryCreationBtnClicked()
{
    SwitchPanels(0);
}

function InitBlogEntrySelectionBoxOptions()
{
    let blog_entries_arr = JSON.parse(localStorage.getItem("blog_entries_arr"));

    blog_entry_selection_box.innerHTML = "";

    for (let current_index = 0; current_index < blog_entries_arr.length; current_index++)
    {
        let current_option_box = document.createElement("option");

        current_option_box.innerHTML = blog_entries_arr[current_index].title;

        blog_entry_selection_box.appendChild(current_option_box);
    }
}

function UpdateBlogEntryDetailsBoxContent()
{
    let blog_entries_arr = JSON.parse(localStorage.getItem("blog_entries_arr"));

    if (blog_entries_arr[blog_entry_selection_box.selectedIndex] == null || blog_entries_arr[blog_entry_selection_box.selectedIndex] == undefined)
    {
        entry_title_preview_and_editor_input_box.value = "";
    }
    else
    {
        entry_title_preview_and_editor_input_box.value = blog_entries_arr[blog_entry_selection_box.selectedIndex].title;
    }

    entry_title_preview_and_editor_input_box.readOnly = true;

    entry_title_preview_and_editor_input_box.height = entry_title_preview_and_editor_input_box.scrollHeight;

    if (blog_entries_arr[blog_entry_selection_box.selectedIndex] == null || blog_entries_arr[blog_entry_selection_box.selectedIndex] == undefined)
    {
        entry_content_preview_and_editor_input_box.value = "";
    }
    else
    {
        entry_content_preview_and_editor_input_box.value = blog_entries_arr[blog_entry_selection_box.selectedIndex].content;
    }

    entry_content_preview_and_editor_input_box.readOnly = true;

    entry_content_preview_and_editor_input_box.height = entry_content_preview_and_editor_input_box.scrollHeight;
}

function OnBlogEntrySelectionBoxChanged()
{
    UpdateBlogEntryDetailsBoxContent();

    edit_entry_btn.innerHTML = "Edit post";
}

function OnEditEntryBtnClicked()
{
    if (entry_title_preview_and_editor_input_box.readOnly == true)
    {
        edit_entry_btn.innerHTML = "Save changes";
    }
    else
    {
        edit_entry_btn.innerHTML = "Edit post";

        let blog_entries_arr = JSON.parse(localStorage.getItem("blog_entries_arr"));

        blog_entries_arr[blog_entry_selection_box.selectedIndex].title = entry_title_preview_and_editor_input_box.value;

        blog_entries_arr[blog_entry_selection_box.selectedIndex].content = entry_content_preview_and_editor_input_box.value;

        localStorage.setItem("blog_entries_arr", JSON.stringify(blog_entries_arr));
    }

    entry_title_preview_and_editor_input_box.readOnly = !entry_title_preview_and_editor_input_box.readOnly;

    entry_content_preview_and_editor_input_box.readOnly = !entry_content_preview_and_editor_input_box.readOnly;
}

function OnDeleteEntryBtnClicked()
{
    let blog_entries_arr = JSON.parse(localStorage.getItem("blog_entries_arr"));

    blog_entries_arr.splice(blog_entry_selection_box.selectedIndex, 1);

    localStorage.setItem("blog_entries_arr", JSON.stringify(blog_entries_arr));

    InitBlogEntrySelectionBoxOptions();

    UpdateBlogEntryDetailsBoxContent();
}

function OnCancelManagementBtnClicked()
{
    edit_entry_btn.innerHTML = "Edit post";

    SwitchPanels(0);
}