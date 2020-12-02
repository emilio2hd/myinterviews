def fill_in_ckeditor(locator = nil, with:)
  ckeditor = all("#{locator} .ck-editor__editable").first
  ckeditor.click
  ckeditor.execute_script 'document.execCommand( "selectAll", false, null )'
  ckeditor.send_keys :delete
  ckeditor.send_keys with
end

def has_notification_with?(message)
  expect(page).to have_selector('nz-notification')

  within 'nz-notification' do
    expect(page).to have_content message
  end
end

def confirm_delete
  within '.ant-popover' do
    click_button 'OK'
  end
end