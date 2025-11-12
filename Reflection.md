# Challenges and How I overcame them
One of the challenges I faced was learning how to properly structure the applications using the Context API and custom hooks. At first I struggled with managing state across different components and dealing with prop drilling. When building the quiz creation feature, the quiz disappeared after clicking `Create Quiz`. After debugging with console logs, I found that the issue came from Shadcn’s Select component not supporting empty string values. This taught me the importance of reading documentation carefully.

Another challenge was comparing dates to sort quizzes into past, current, and future. My first approach didn’t work because of timezone differences. I fixed this by normalising the dates and comparing them as strings, which gave consistent results. This showed me how small details like timezones can affect logic.

Working on the OpenTDB API also required careful handling of loading states and errors to keep the user experience smooth. After I added localStorage caching for quiz categories, it made the app faster and taught me basic optimization.

# Future Improvements

I would focus on getting the first bare minimum that allows the code to run, shows that its functional then dive in with the styling as I may have focused too much on appearance over functionality at some points in my project.


# New Skills and Learning

I learned how to better use Shadcn UI components and customise them for my needs. Building custom hooks helped me separate logic from UI, and using the Context API made managing global state much easier.

I also got a better understanding on how to use localStorage for saving data, how to design a smoother user experience with loading spinners and always form validation, and its always better having modular and reusable code where possible.
