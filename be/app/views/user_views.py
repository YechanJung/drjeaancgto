from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from app.serializer import ProductSerializer, UserSerializer, UserSerializerWithToken  
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
            data = super().validate(attrs)

            serializer = UserSerializerWithToken(self.user).data
            for k, v in serializer.items():
                data[k] = v
 

            return data
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer 

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)
# from google.cloud import recaptchaenterprise_v1
# from google.cloud.recaptchaenterprise_v1 import Assessment

# create_assessment function...

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateUserProfile(request):
#     user = request.user
#     data = request.data

#     # Verify the reCAPTCHA token
#     recaptcha_token = data.get('recaptcha_token')
#     if not recaptcha_token:
#         return Response({'detail': 'No reCAPTCHA token provided'}, status=400)

#     project_id = 'your-project-id'  # replace with your project ID
#     recaptcha_key = 'your-recaptcha-key'  # replace with your reCAPTCHA key
#     recaptcha_action = 'updateUserProfile'  # replace with the actual action
#     assessment = create_assessment(project_id, recaptcha_key, recaptcha_token, recaptcha_action)

#     if not assessment or assessment.risk_analysis.score < 0.5:  # adjust the score as needed
#         return Response({'detail': 'reCAPTCHA verification failed'}, status=400)

#     # Update the user profile
#     serializer = UserSerializerWithToken(user, many=False)
#     user.first_name = data['name']
#     user.username = data['email']
#     user.email = data['email']
#     if data['password'] != '':
#         user.password = make_password(data['password'])
#     user.save()
#     return Response(serializer.data)

# rest of your code
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)