import openai
from flask import Flask, request, jsonify
import json
import requests

openai.api_key = "API KEY HERE"

app = Flask(__name__)


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


@app.route('/survey', methods=['POST'])
def survey():
    # Retrieve survey data from request payload
    data = request.json
    theme = data['theme']
    location = data['location']

    # Get news related to the theme and location
    news_articles = get_news(theme, location)

    # Generate the prompt based on the theme and location
    if location:
        prompt = f"I'm making a survey on {theme} in {location}. Ask 1 question based on the theme."
    else:
        prompt = f"I'm making a survey on {theme}. Ask 1 question based on the theme."

    response = ask_question(prompt)

    questions = []
    answers = []
    for i in range(4):
        user_response = data['responses'][i]
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

    lastq = data['responses'][4]
    answers.append(lastq)

    return jsonify(answers=answers, questions=questions)


if __name__ == '__main__':
    app.run()
