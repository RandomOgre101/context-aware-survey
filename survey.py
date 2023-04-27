import openai
import json
import requests


openai.api_key = "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"

def get_location():
    try:
        # Get IP address
        ip_request = requests.get('https://get.geojs.io/v1/ip.json')
        my_ip = ip_request.json()['ip']
        # Get location
        geo_request_url = f'https://get.geojs.io/v1/ip/geo/{my_ip}.json'
        geo_request = requests.get(geo_request_url)
        geo_data = geo_request.json()
        return geo_data['city']
    except:
        return None

def get_news(theme, location):
    news_api_key = "70b5396ff823433bb4b7a3a8de79e925"
    if location:
        url = f"https://newsapi.org/v2/everything?q={theme}&apiKey={news_api_key}&country={location}"
    else:
        url = f"https://newsapi.org/v2/everything?q={theme}&apiKey={news_api_key}"
    response = requests.get(url)
    data = json.loads(response.text)
    if 'articles' in data:
        return data['articles']
    else:
        return []


def ask_question(prompt):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        temperature=0.7,
        max_tokens=1024,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    return response.choices[0].text.strip()

def main():
    global answers
    global questions
    # Get the theme of the survey
    theme = input("What is the theme of the survey? ")

    # Get user name
    name = input("What is your name? ")
    
    # Get user location
    location = get_location()
    if location:
        print(f"Detected location: {location}")
    
    # Get news related to the theme and location
    news_articles = get_news(theme, location)

        
    # Generate the prompt based on the theme and location
    if location:
        prompt = f"I'm making a survey on {theme} in {location}. Ask 1 question based on the theme."
    else:
        prompt = f"I'm making a survey on {theme}. Ask 1 question based on the theme."

    response = ask_question(prompt)
    print(f"{response}")

    questions = []
    answers = []
    for i in range(4):
            user_response = input("Please enter your response: ")
            answers.append(user_response)
            questions.append(response)
            if "Choices:" in response:
                # The previous question was a multiple choice question
                choices_prompt = response.split("Choices:", 1)[1]
                choices = choices_prompt.split(",")
                choices = [choice.strip() for choice in choices]
                try:
                    answer_index = int(user_response) - 1
                    if answer_index < 0 or answer_index >= len(choices):
                        raise ValueError()
                    answer = choices[answer_index]
                    followup_prompt = f"Ask the next question, related to the previous question, based on {theme},the news articles you just read {news_articles} and {location}. The answer to the last question was '{answer}'."
                except ValueError:
                    print("Please enter a valid response.")
            else:
                # The previous question was a descriptive question
                followup_prompt = f"Ask the next question, related to the previous question, based on {theme},the news articles you just read {news_articles} and {location}."

        # Ask follow-up question using GPT-3 API
            response = ask_question(followup_prompt)
            print(f"{response}")

    lastq = input("Please enter your response: ")
    answers.append(lastq)

    print("\nThank you for your response.")

    return answers, questions

main()
# res = "\n".join(f"Question: {x}\nAnswer: {y}\n" for x, y in zip(questions, answers))
# print("\n")
# print(res)
