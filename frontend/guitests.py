"""
Tests of the frontend GUI, using Selenium for python.
"""

import selenium
from selenium import webdriver
import re # Regular Expressions
import unittest # Python unit test library
import time # For time

class SeleniumTesting(unittest.TestCase):

	# Create the Web Driver (we'll use Chrome)
	def setUp(self):
		self.wdriver = webdriver.Chrome(executable_path = r"chromedriver.exe")
		# self.base_url = "http://api.ontherun.me"
		
		self.base_url = "http://ontherun.me"

	# Check that the about page link takes us to the right page.
	def test_about(self):
		# Create copy of driver with base URL.
		driver = self.wdriver
		driver.get(self.base_url)

		# Wait a little bit.
		time.sleep(2)

		# Click on the about page and check its URL.
		driver.find_element_by_link_text("About").click()
		self.assertEqual(driver.current_url, self.base_url + "/about")
		pass

	# Check the States page and a State instance.
	def test_states(self):
		# Create copy of driver with base URL.
		driver = self.wdriver
		driver.get(self.base_url)

		# Wait a little bit.
		time.sleep(2)

		# Click on the states page and check its URL.
		driver.find_element_by_link_text("States").click()
		self.assertEqual(driver.current_url, self.base_url + "/states")
		pass

	def test_State(self):
		# Testing an instance of state.
		# Check that we make it to states page.
		driver = self.wdriver
		driver.get(self.base_url)

		# Wait a little bit.
		time.sleep(2)

		driver.find_element_by_link_text("States").click()
		self.assertEqual(driver.current_url, self.base_url + "/states")

		# Wait a little bit.
		time.sleep(2)

		# Get the instance by xpath.
		instance = driver.find_element_by_xpath('//*[@id="root"]/div/main/div/div[1]/div[1]/div/div/img')
		instance.click()
		self.assertEqual(driver.current_url, self.base_url + "/State")
		pass


	# Check the Criminals page and a Criminal instance.
	def test_criminals(self):
		# Create copy of driver with base URL.
		driver = self.wdriver
		driver.get(self.base_url)

		# Wait a little bit.
		time.sleep(2)

		# Click on the states page and check its URL.
		driver.find_element_by_link_text("Criminals").click()
		self.assertEqual(driver.current_url, self.base_url + "/criminals")
		pass

	def test_Criminal(self):
		# Testing an instance of criminal.
		# Check that we make it to criminals page.
		driver = self.wdriver
		driver.get(self.base_url)

		# Wait a little bit.
		time.sleep(2)

		driver.find_element_by_link_text("Criminals").click()
		self.assertEqual(driver.current_url, self.base_url + "/criminals")

		# Wait a little bit.
		time.sleep(2)

		# Get the instance by xpath.
		instance = driver.find_element_by_xpath('//*[@id="root"]/div/main/div/div[1]/div[2]')
		instance.click()
		self.assertEqual(driver.current_url, self.base_url + "/Criminal")
		pass

	# Check the Crimes page and a Crime instance.
	def test_crimes(self):
		# Create copy of driver with base URL.
		driver = self.wdriver
		driver.get(self.base_url)

		# Wait a little bit.
		time.sleep(2)

		# Click on the states page and check its URL.
		driver.find_element_by_link_text("Crimes").click()
		self.assertEqual(driver.current_url, self.base_url + "/crimes")
		pass

	def test_Crime(self):
		# Testing an instance of criminal.
		# Check that we make it to criminals page.
		driver = self.wdriver
		driver.get(self.base_url)
		driver.find_element_by_link_text("Crimes").click()
		self.assertEqual(driver.current_url, self.base_url + "/crimes")

		# Wait a little bit.
		time.sleep(2)

		# Get the instance by xpath.
		instance = driver.find_element_by_xpath('//*[@id="root"]/div/main/div/div[1]/div[2]')
		instance.click()
		self.assertEqual(driver.current_url, self.base_url + "/Crime")
		pass

	# Test the navbar from every page.
	def test_nav(self):
		driver = self.wdriver

		all_page_paths = ["", "/about", "/criminals", "/states", "/crimes"]
		# navbar_link_text = ["About", "Criminals", "States", "Crimes"]

		for app in all_page_paths:
			driver.get(self.base_url + app)
			driver.find_element_by_link_text("About").click()
			self.assertEqual(driver.current_url, self.base_url + "/about")
			time.sleep(2)

			driver.get(self.base_url + app)
			driver.find_element_by_link_text("Criminals").click()
			self.assertEqual(driver.current_url, self.base_url + "/criminals")
			time.sleep(2)

			driver.get(self.base_url + app)
			driver.find_element_by_link_text("States").click()
			self.assertEqual(driver.current_url, self.base_url + "/states")
			time.sleep(2)

			driver.get(self.base_url + app)
			driver.find_element_by_link_text("Crimes").click()
			self.assertEqual(driver.current_url, self.base_url + "/crimes")
			time.sleep(2)

		pass


	# Clean up.
	def tearDown(self):
		self.wdriver.close()

if __name__ == '__main__':
	unittest.main()
	# suite = unittest.TestLoader().loadTestsFromTestCase(SeleniumTesting)
	# unittest.TextTestRunner(verbosity=2).run(suite)