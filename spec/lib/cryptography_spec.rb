# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Cryptography do
  let(:raw_message) { 'new!m3ss4g3' }
  let(:encoded_message) { 'd_5b5S6zdcs-q6Nx6RzcQQ==' }
  let(:bad_encoded_message) { 'd_5b5S6zdcs+{}q6Nx6RzcQQ==' }

  describe '.encrypt' do
    it 'should encrypt the text and return base64 url safe encoded' do
      expect(Cryptography.encrypt(raw_message)).to eq(encoded_message)
    end
  end

  describe '.decrypt' do
    it 'should decrypt the base64 encoded message and return the raw message' do
      expect(Cryptography.decrypt(encoded_message)).to eq(raw_message)
    end

    context 'with bad base64 encode' do
      it 'should return the encoded message' do
        expect(Cryptography.decrypt(bad_encoded_message)).to eq(bad_encoded_message)
      end
    end
  end
end
