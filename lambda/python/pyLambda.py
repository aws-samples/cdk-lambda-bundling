import string_utils

def handler(event, context):
    message = '{} {} {}!'.format(string_utils.reverse(',olleH'), event['firstName'].upper(), event['lastName'].upper())  
    return message