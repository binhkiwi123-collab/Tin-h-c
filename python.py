try:
    with open('data.txt', 'r') as file:
        content = file.read()
    chuhoa = content.upper()

    with open('output.txt', 'w') as output_file:
        output_file.write(chuhoa)
    words = content.split()
    wordcount = {word: words.count(word) for word in set(words)}

    print("Dictionary:", wordcount)
    

except FileNotFoundError:
    print("Không tìm thấy file ")
    existing_dict = {'Python': 3, 'Java': 2}

    for key, value in wordcount.items():
        existing_dict[key] = existing_dict.get(key, 0) + value

    print("Kết quả hợp nhất:", existing_dict)

except FileNotFoundError:
    print("Không tìm thấy file data.txt")





