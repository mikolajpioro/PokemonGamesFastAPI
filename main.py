from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import requests
import random

app = FastAPI()
app.mount('/static', StaticFiles(directory='static'), name='static')
template = Jinja2Templates(directory='templates')

base_url = "https://pokeapi.co/api/v2/"

# Random Pokemon app code -------------------------
def get_pokemon(id):
    url = f"{base_url}/pokemon/{id}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return {
            "name": data["name"],
            "id": data["id"],
            "sprite": data['sprites']['other']['official-artwork']['front_default']
        }
    else:
        return "Failed"

pokemon_info = get_pokemon(random.randint(1, 1025))

if pokemon_info:
    final_info = [
    {"name": pokemon_info["name"], "id": pokemon_info["id"], "sprite": pokemon_info["sprite"]}
]
# Random Pokemon app code -------------------------



# Hangman game app code ---------------------------
def get_pokemon_sprite(hangman_id):
    url = f"{base_url}/pokemon/{hangman_id}"
    response = requests.get(url)

    if response.status_code == 200:
        hangman_data = response.json()
        name = hangman_data["name"]
        return {
            "name": name,
            "sprite": hangman_data['sprites']['other']['official-artwork']['front_default'],
            "hint": " ".join(["_" for char in name])
        }
    else:
        return "Failed"
    
hangman_info = get_pokemon_sprite(random.randint(1, 1025))

if hangman_info:
    final_hangman_info = [
        {"name": hangman_info["name"], "sprite": hangman_info["sprite"], "hint": hangman_info["hint"]}
    ]
# Hangman game app code ---------------------------

@app.get("/")
def home(request: Request):
    return template.TemplateResponse("home.html", {"request": request})

@app.get("/random")
def randomGame(request: Request):
    return template.TemplateResponse("randomGame.html", {"request": request, "final_info": final_info})

@app.get("/hangman")
def hangmanGame(request: Request):
    return template.TemplateResponse("hangman.html", {"request": request, "final_hangman_info": final_hangman_info})