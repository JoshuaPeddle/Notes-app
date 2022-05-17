

import time
import random
print(random.__file__)
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType



sample_title = str(random.randint(1,100000))
sample_body = str(random.randint(1,100000))
wait_after_submit = 2


# Chromedriver setup
chrome_service = Service(ChromeDriverManager(chrome_type=ChromeType.CHROMIUM).install())

chrome_options = Options()
options = [
    "--headless",
    "--disable-gpu",
    "--window-size=1920,1200",
    "--ignore-certificate-errors",
    "--disable-extensions",
    "--no-sandbox",
    "--disable-dev-shm-usage"
]
for option in options:
    chrome_options.add_argument(option)


driver = webdriver.Chrome(service=chrome_service, options=chrome_options)
start_time = time.time()
print("# Start interacting with the website")
# Start interacting with the website
driver.get('https://notesapp.cloud')
username_input = driver.find_element(By.ID, "username")
password_input = driver.find_element(By.ID, "current-password")
print("# Log in")
#Log in
username_input.send_keys("123")
password_input.send_keys("123")
password_input.send_keys(Keys.ENTER)
print("# Send a note")
#Send a note
title_input = driver.find_element(By.ID, "title_input")
text_input_textarea = driver.find_element(By.ID, "text_input")
title_input.send_keys(sample_title)
text_input_textarea.send_keys(sample_body)
add_note_button = driver.find_element(By.ID, "add_note_button")
add_note_button.click()
print("# Wait")
#Wait
sleep(wait_after_submit)
print("# Ensure new note is first in line")
#Ensure new note is first in line
all_notes_div = driver.find_element(By.ID, "all_notes")
title_text = all_notes_div.find_elements(By.CLASS_NAME, "note_div")[0].find_element(By.CLASS_NAME, "title_body").find_element(By.CLASS_NAME, "note_title").text
body_text = all_notes_div.find_elements(By.CLASS_NAME, "note_div")[0].find_element(By.CLASS_NAME, "title_body").find_element(By.CLASS_NAME, "note_body").text


assert(title_text == sample_title)
assert(body_text == sample_body)

print("# Delete note")
# Delete note
deletebutton = all_notes_div.find_elements(By.CLASS_NAME, "note_div")[0].find_element(By.CLASS_NAME, "edit_delete").find_element(By.CLASS_NAME, "note_delete")
deletebutton.click()

print("# Wait")
#Wait
sleep(wait_after_submit)

# Ensure note removed
title_text = all_notes_div.find_elements(By.CLASS_NAME, "note_div")[0].find_element(By.CLASS_NAME, "title_body").find_element(By.CLASS_NAME, "note_title").text
body_text = all_notes_div.find_elements(By.CLASS_NAME, "note_div")[0].find_element(By.CLASS_NAME, "title_body").find_element(By.CLASS_NAME, "note_body").text
deletebutton = all_notes_div.find_elements(By.CLASS_NAME, "note_div")[0].find_element(By.CLASS_NAME, "edit_delete").find_element(By.CLASS_NAME, "note_delete")

assert(title_text != sample_title)
assert(body_text != sample_body)


print("# Log out")
# Log out
all_notes_div = driver.find_element(By.ID, "title_container").find_element(By.TAG_NAME,'form').submit()
print("# Should have login page")
# Should have login page
driver.find_element(By.ID,"login_container")
print("# Success")
time_to_run =  time.time() - start_time
print(time_to_run-wait_after_submit*2)
driver.close()