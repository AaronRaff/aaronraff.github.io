---
slug: "/blog/how-to-write-your-first-python-test"
date: "2020-09-26"
title: "How to Write Your First Python Test"
subtitle: "Python’s standard library includes the unittest module which provides handy tools to write tests. Here’s how you can start validating that your Python code works."
altText: "An example of calling the unittest module from the command line."
featuredImage: ../images/how-to-write-your-first-python-test.png
---
# What is unit testing?
Unit testing is a form of testing where you write code to test pieces of your program. Normally, unit testing is concerned with testing specific functions in your codebase. This turns out to be super useful when building software!

Writing good unit tests allows you to verify the correctness of your program in an automated fashion. This can save you _a lot_ of time in the long run. It allows you to verify your code’s behavior without having to manually run test cases every single time that you make a change. Of course it’s always good to manually test new features and perform some regression testing before you release new code, but unit tests allow you to be more confident about your changes!

Imagine coming back to some code you or a teammate wrote several months ago and you want to make a small change to an existing function. Maybe it’s to improve readability or maybe you are trying to fix a memory leak; automated tests can help catch any newly introduced bugs. If there were no existing tests around the code you changed, modifying the code would be slower and less convenient. As an engineering team, you want to be able to constantly improve the codebase you’re working on with minimal friction, and unit testing is a step in the right direction.

# A simplified example
Let’s walk through a super simple example! To start off, let’s create a function that divides two numbers and returns the result to the caller.

<i>main.py</i>
```python
def div(x: int, y: int) -> int:
    return x / y
```

Now we can write some tests around this function. We can do this by calling the function with different inputs and confirming that the result is what we expect. First we need to set up the test class. The [unittest](https://docs.python.org/3/library/unittest.html) module provides a class called `TestCase` that we can subclass. This will allow us to inherit some useful helper functions and it also informs the test runner about how our tests should be ran.

<i>test_main.py</i>
```python
import unittest

class TestMain(unittest.TestCase):
	...
```

Each function within this class will then be ran as a test by the test runner, provided that the function name starts with “test”. You can follow any naming convention after that, but I like to follow this naming convention: `test__function_being_tested__specific_case`. In my opinion, this makes it easy to understand the intent of a test without having to read exactly what it’s doing.

For the simple `div` function above, we can write a test by calling the function and asserting that the result is what we expect. In general, it’s a good idea to pick a common use case and a few edge cases to test. By doing this, the test can catch any mistakes you made or could make if you touch this code later.

<i>test_main.py</i>
```python
import unittest
import main


class TestMain(unittest.TestCase):
    def test__div__positive_integers(self):
        result = main.div(6, 2)
        self.assertEqual(result, 3)

    def test__div__negative_integers(self):
        result = main.div(-6, 2)
        self.assertEqual(result, -3)

    def test__div__zero_numerator(self):
        result = main.div(0, 2)
        self.assertEqual(result, 0)

    def test__div__zero_denominator(self):
        result = main.div(6, 0)
        self.assertEqual(result, 0)  # what do we expect here?
```

You can run these test cases by running `python3 -m unittest test_main`. This should produce the following output:

<i>output</i>
```
..E.
======================================================================
ERROR: test__div__zero_denominator (test_main.TestMain)
----------------------------------------------------------------------
Traceback (most recent call last):
  File ".../blog-code/how-to-write-your-first-python-test/test_main.py", line 19, in test__div__zero_denominator
    result = main.div(6, 0)
  File ".../blog-code/how-to-write-your-first-python-test/main.py", line 2, in div
    return x / y
ZeroDivisionError: division by zero

----------------------------------------------------------------------
Ran 4 tests in 0.001s

FAILED (errors=1)
```

As you can see, the test that attempts to divide by zero fails! I purposely added that failing test as an example, but we can change that assertion so that it checks if a `ZeroDivisionError` is thrown.

<i>test_main.py</i>
```python
def test__div__zero_denominator(self):
    with self.assertRaises(ZeroDivisionError):
        result = main.div(6, 0)
```

By using the `self.assertRaises` context manager we are telling the test runner to verify that the given exception is raised somewhere in the context. Running the tests again will pass as expected. The [unittest](https://docs.python.org/3/library/unittest.html) module provides a ton of handy assertions, I would highly recommend checking out the docs to see what is available!

# Mocking function calls
If you are trying to test a function that calls another function within itself, it’s usually a good idea to “mock” or fake that function call. By doing this, you can specify the value that the mocked function should return. Since unit testing is normally focused on testing a specific function, it’s a good idea to mock dependencies when writing tests. A dependency could be anything from a function call to a database connection. Another form of testing is called _integration testing_ which is about testing how different components interact with each other. When performing integration testing, it’s probably a good idea to not mock out these function calls, but for the purpose of this blog post we’ll stick to unit testing.

Let’s write a couple of new functions so that we can take a look at mocking in action! We’ll create a function that calls another function within itself.

<i>main.py</i>
```python
import os


def get_base_url() -> str:
    return os.getenv(‘BASE_URL’)


def get_user_url(username: str) -> str:
    return f'https://{get_base_url()}/{username}'
```

This example is super simplified, but that’s the point! By mocking the `get_base_url` function, you can test the `get_user_url` function without setting up environment variables just for your tests. Another example of a good function to mock could be functions that create objects (e.g. dataclasses). Mocking out these types of functions allows you to unit test your functions without worrying about dependencies. Of course, it’s important to write integration tests as well, but that is a little out of scope for this post.

Mocking functions with the `unittest` package is pretty straightforward. Let’s take a look at an example using the `patch` function:

<i>test_main.py</i>
```python
import unittest
from unittest.mock import patch

import main


class TestMain(unittest.TestCase):
    …
    def test__get_user_url(self):
        with patch(
            "main.get_base_url", return_value="www.twitter.com"
        ) as mock_get_base_url:
            url = main.get_user_url("aaronraff_")
            mock_get_base_url.assert_called_once()
            self.assertEqual(url, "https://www.twitter.com/aaronraff_")
```

The `patch` context manager will create a [MagicMock](https://docs.python.org/3/library/unittest.mock.html#unittest.mock.MagicMock) under the hood which you can grab a hold of using the `as` keyword. The first argument is the target that you want to mock. This should be in the form of `module.ClassName.function`. In this example we also passed the `return_value` argument which is the value that gets returned when this target is called. This is how we can mock out a function call! Additionally, we can use the mock object to assert that the target was called. The rest of this test function should look very similar to the example earlier in this post.

To run _only_ this test you can run `python3 -m unittest test_main.TestMain.test__get_user_url`. The argument here is also in the form of `module.ClassName.function`. This is really useful if you don’t want to run the entire test suite every time you update a test.

This is just the tip of the iceberg when it comes to testing your Python code with the unittest module. Other things that you may want to do in your Python tests are [asserting a function was called with the correct parameters](https://docs.python.org/3/library/unittest.mock.html#unittest.mock.Mock.assert_called_with) or [making your mocked function raise an exception](https://docs.python.org/3/library/unittest.mock.html#unittest.mock.Mock.side_effect). As always, you can find all of the code in this post on my [GitHub](https://github.com/aaronraff/blog-code/tree/master/how-to-write-your-first-python-test). Thanks for reading!
